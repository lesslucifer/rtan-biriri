import { useState } from 'react';
import { Button, TextInput, Container, Title, Text, Group, Box, Alert } from '@mantine/core';
import { useFirebase } from '../hooks/useFirebase';
import { useAuth } from '../hooks/useAuth';

interface TestDocument {
  id?: string;
  title: string;
  description: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export function FirebaseTest() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, loading: authLoading, signInWithEmail, signUpWithEmail, signOut } = useAuth();
  const { data, loading: dataLoading, error, create, delete: deleteDoc } = useFirebase<TestDocument>({
    collectionName: 'test_collection'
  });

  const handleCreateDocument = async () => {
    if (!title || !description) return;

    try {
      await create({ title, description });
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error('Error creating document:', err);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) return;

    try {
      await signUpWithEmail(email, password);
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error('Error signing up:', err);
    }
  };

  const handleSignIn = async () => {
    if (!email || !password) return;

    try {
      await signInWithEmail(email, password);
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error('Error signing in:', err);
    }
  };

  if (authLoading || dataLoading) {
    return (
      <Container size="sm" py="xl">
        <Text>Loading...</Text>
      </Container>
    );
  }

  return (
    <Container size="sm" py="xl">
      <Title order={2} mb="xl">Firebase Integration Test</Title>

      {error && (
        <Alert color="red" mb="md">
          {error}
        </Alert>
      )}

      {/* Authentication Section */}
      <Box mb="xl">
        <Title order={3} mb="md">Authentication</Title>

        {!user ? (
          <>
            <TextInput
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              mb="md"
            />
            <TextInput
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              mb="md"
            />
            <Group>
              <Button onClick={handleSignIn}>Sign In</Button>
              <Button onClick={handleSignUp} variant="outline">Sign Up</Button>
            </Group>
          </>
        ) : (
          <>
            <Text mb="md">Welcome, {user.email}!</Text>
            <Button onClick={() => signOut()} variant="outline">Sign Out</Button>
          </>
        )}
      </Box>

      {/* Firestore Section */}
      <Box mb="xl">
        <Title order={3} mb="md">Firestore Test</Title>

        <TextInput
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          mb="md"
        />
        <TextInput
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          mb="md"
        />
        <Button onClick={handleCreateDocument} mb="xl">
          Create Document
        </Button>

        <Title order={4} mb="md">Documents ({data.length})</Title>
        {data.map((doc) => (
          <Box key={doc.id} p="md" bg="gray.1" mb="sm" style={{ borderRadius: '8px' }}>
            <Text fw={500}>{doc.title}</Text>
            <Text size="sm" c="dimmed">{doc.description}</Text>
            <Button
              size="xs"
              variant="subtle"
              color="red"
              mt="sm"
              onClick={() => doc.id && deleteDoc(doc.id)}
            >
              Delete
            </Button>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
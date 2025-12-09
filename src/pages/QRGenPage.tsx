import { useState, useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function QRGenPage() {
  const [text, setText] = useState('')
  const [size, setSize] = useState(256)
  const [fgColor, setFgColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [centerImage, setCenterImage] = useState<string | null>(null)
  const [imageSize, setImageSize] = useState(50)
  const qrRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setCenterImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector('canvas')
    if (canvas) {
      const url = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = 'qr-code.png'
      link.href = url
      link.click()
    }
  }

  const handleClearImage = () => {
    setCenterImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">QR Code Generator</h1>
          <p className="text-gray-600">Create custom QR codes with ease</p>
        </div>

        <Card className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Text or URL</label>
            <Input
              placeholder="Enter text or URL to encode"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              QR Code Size: {size}px
            </label>
            <input
              type="range"
              min="128"
              max="512"
              step="32"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>128</span>
              <span>256</span>
              <span>384</span>
              <span>512</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Foreground Color</label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="h-10 w-20 rounded border border-gray-300 cursor-pointer"
                />
                <Input
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  placeholder="#000000"
                  className="flex-1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Background Color</label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="h-10 w-20 rounded border border-gray-300 cursor-pointer"
                />
                <Input
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  placeholder="#ffffff"
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Center Image</label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1"
              >
                Upload Image
              </Button>
              {centerImage && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClearImage}
                  className="text-red-600 hover:text-red-700"
                >
                  Clear
                </Button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/gif"
              onChange={handleImageUpload}
              className="hidden"
            />
            {centerImage && (
              <div className="mt-4 flex items-center gap-4">
                <img src={centerImage} alt="Center" className="w-16 h-16 object-contain rounded border" />
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Image Size: {imageSize}px
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    step="5"
                    value={imageSize}
                    onChange={(e) => setImageSize(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>
        </Card>

        {text && (
          <Card className="p-6">
            <div className="space-y-4">
              <div ref={qrRef} className="flex justify-center">
                <div className="bg-white rounded-lg shadow-sm">
                  <QRCodeCanvas
                    value={text}
                    size={size}
                    fgColor={fgColor}
                    bgColor={bgColor}
                    level="H"
                    marginSize={Math.ceil(Math.sqrt(size) / 6)}
                    imageSettings={centerImage ? {
                      src: centerImage,
                      x: undefined,
                      y: undefined,
                      height: imageSize,
                      width: imageSize,
                      excavate: true,
                    } : undefined}
                  />
                </div>
              </div>
              <Button
                onClick={handleDownload}
                className="w-full"
                size="lg"
              >
                Download QR Code
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

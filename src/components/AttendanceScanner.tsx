import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Bluetooth, CheckCircle, AlertCircle, Scan } from 'lucide-react';

interface ScannerProps {
  onScanComplete?: (success: boolean) => void;
}

export const AttendanceScanner: React.FC<ScannerProps> = ({ onScanComplete }) => {
  const [faceScanStatus, setFaceScanStatus] = useState<'idle' | 'scanning' | 'success' | 'failed'>('idle');
  const [bluetoothStatus, setBluetoothStatus] = useState<'idle' | 'scanning' | 'success' | 'failed'>('idle');
  const [attendanceMarked, setAttendanceMarked] = useState(false);

  const handleFaceScan = async () => {
    setFaceScanStatus('scanning');
    // Simulate scanning
    await new Promise(resolve => setTimeout(resolve, 3000));
    const success = Math.random() > 0.2; // 80% success rate
    setFaceScanStatus(success ? 'success' : 'failed');
    
    if (success) {
      handleBluetoothScan();
    }
  };

  const handleBluetoothScan = async () => {
    setBluetoothStatus('scanning');
    // Simulate Bluetooth scanning
    await new Promise(resolve => setTimeout(resolve, 2000));
    const success = Math.random() > 0.1; // 90% success rate
    setBluetoothStatus(success ? 'success' : 'failed');
    
    if (success && faceScanStatus === 'success') {
      setAttendanceMarked(true);
      onScanComplete?.(true);
    }
  };

  const resetScanner = () => {
    setFaceScanStatus('idle');
    setBluetoothStatus('idle');
    setAttendanceMarked(false);
  };

  const getScannerIcon = (status: string) => {
    switch (status) {
      case 'scanning': return <Scan className="h-8 w-8 animate-scan" />;
      case 'success': return <CheckCircle className="h-8 w-8 text-success" />;
      case 'failed': return <AlertCircle className="h-8 w-8 text-destructive" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scanning': return <Badge variant="secondary" className="animate-pulse">Scanning...</Badge>;
      case 'success': return <Badge className="status-success">Verified</Badge>;
      case 'failed': return <Badge className="status-danger">Failed</Badge>;
      default: return <Badge variant="outline">Ready</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {attendanceMarked && (
        <Card className="glass-card border-success bg-gradient-to-r from-success/10 to-success/5">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-16 w-16 text-success mx-auto mb-4 animate-bounce" />
            <h3 className="text-2xl font-semibold text-success mb-2">Attendance Marked Successfully!</h3>
            <p className="text-muted-foreground">Your presence has been verified and recorded.</p>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Face Recognition Scanner */}
        <Card className="glass-card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-primary" />
              Facial Recognition
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <div className={`scanner-ring w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center ${
                faceScanStatus === 'scanning' ? 'animate-pulse-glow' : ''
              }`}>
                {faceScanStatus === 'idle' ? (
                  <Camera className="h-12 w-12 text-primary" />
                ) : (
                  getScannerIcon(faceScanStatus)
                )}
              </div>
            </div>
            
            <div className="text-center space-y-2">
              {getStatusBadge(faceScanStatus)}
              <p className="text-sm text-muted-foreground">
                {faceScanStatus === 'idle' && 'Position your face in the scanner'}
                {faceScanStatus === 'scanning' && 'Hold still while we verify your identity...'}
                {faceScanStatus === 'success' && 'Face verified successfully!'}
                {faceScanStatus === 'failed' && 'Face verification failed. Please try again.'}
              </p>
            </div>

            <Button 
              onClick={handleFaceScan}
              disabled={faceScanStatus === 'scanning' || faceScanStatus === 'success'}
              variant={faceScanStatus === 'success' ? 'success' : 'scan'}
              className="w-full"
            >
              {faceScanStatus === 'scanning' ? 'Scanning Face...' : 'Start Face Scan'}
            </Button>
          </CardContent>
        </Card>

        {/* Bluetooth Proximity Scanner */}
        <Card className="glass-card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bluetooth className="h-5 w-5 text-primary" />
              Bluetooth Proximity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <div className={`scanner-ring w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center ${
                bluetoothStatus === 'scanning' ? 'animate-pulse-glow' : ''
              }`}>
                {bluetoothStatus === 'idle' ? (
                  <Bluetooth className="h-12 w-12 text-primary" />
                ) : (
                  getScannerIcon(bluetoothStatus)
                )}
              </div>
            </div>
            
            <div className="text-center space-y-2">
              {getStatusBadge(bluetoothStatus)}
              <p className="text-sm text-muted-foreground">
                {bluetoothStatus === 'idle' && 'Ensure Bluetooth is enabled on your device'}
                {bluetoothStatus === 'scanning' && 'Checking classroom proximity...'}
                {bluetoothStatus === 'success' && 'Proximity verified successfully!'}
                {bluetoothStatus === 'failed' && 'Proximity verification failed. Move closer to classroom.'}
              </p>
            </div>

            <Button 
              onClick={handleBluetoothScan}
              disabled={bluetoothStatus === 'scanning' || bluetoothStatus === 'success' || faceScanStatus !== 'success'}
              variant={bluetoothStatus === 'success' ? 'success' : 'default'}
              className="w-full"
            >
              {bluetoothStatus === 'scanning' ? 'Checking Proximity...' : 'Check Proximity'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {(faceScanStatus === 'failed' || bluetoothStatus === 'failed') && (
        <div className="text-center">
          <Button onClick={resetScanner} variant="outline">
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
};
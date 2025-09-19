// index.js
import 'process/browser';
import './src/global.css';
import { registerRootComponent } from 'expo';
import React, { useEffect, useRef, useState } from 'react';
import { Platform, Dimensions, StyleSheet } from 'react-native';
import { NativeBaseProvider, Box } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import Modal from 'react-modal';

import App from './App';
import { InstallPWA } from './src/InstallPromptModal';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1, height },
});

function InstallPromptModalWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const deferredPrompt = useRef(null);

  useEffect(() => {
    if (Platform.OS !== 'web') return;

    // Set modal app element
    // Modal.setAppElement('#root');

    const handleBeforeInstallPrompt = (event) => {
      console.log('beforeinstallprompt event fired - index.js:31');
      event.preventDefault();
      
      // Store the event for later use
      deferredPrompt.current = event;
      
      // Show the modal
      setIsOpen(true);
    };

    // Check if the app is already installed
    const isAppInstalled = window.matchMedia('(display-mode: standalone)').matches;
    
    if (!isAppInstalled) {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }

    // Clean up
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    console.log('Install button clicked - index.js:55');
    
    if (deferredPrompt.current) {
      try {
        // Show the install prompt
        deferredPrompt.current.prompt();
        
        // Wait for the user to respond to the prompt
        const choiceResult = await deferredPrompt.current.userChoice;
        
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt - index.js:66');
        } else {
          console.log('User dismissed the install prompt - index.js:68');
        }
      } catch (error) {
        console.error('Error showing install prompt: - index.js:71', error);
      } finally {
        // Clear the deferred prompt
        deferredPrompt.current = null;
        setIsOpen(false);
      }
    } else {
      console.log('No deferred prompt available - index.js:78');
      setIsOpen(false);
    }
  };

  const closeModal = () => {
    console.log('Modal closed - index.js:84');
    setIsOpen(false);
    deferredPrompt.current = null;
  };

  return (
    <InstallPWA
      modalIsOpen={isOpen}
      handleInstallClick={handleInstallClick}
      closeModal={closeModal}
    />
  );
}

function Root() {
  return (
    <NativeBaseProvider>
      <Box style={styles.container}>
        <App />
        {Platform.OS === 'web' && <InstallPromptModalWrapper />}
      </Box>
    </NativeBaseProvider>
  );
}

registerRootComponent(Root);
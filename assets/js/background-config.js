/*!
 * NODAL – Transparent Bayer Dithering Background Configuration
 * This is the central configuration file for the background animation.
 * All configuration should be done here, not in CSS or background.js
 */
document.addEventListener('DOMContentLoaded', function() {
  // We'll use a function to ensure the background API is available
  function initializeBackground() {
    // Check if the background API is available
    if (window.bayerBackground) {
      console.log('[bayerbg-config] Background API detected, configuring...');
      // CONFIGURATION
      // -------------
      // These are the master settings for the background animation
      const CONFIG = {
      // Shape settings
      cellSize: 5,                   // Size of each dot cell in pixels (increased from 16 to 18)
      shape: 'circle',                // Options: circle, square, diamond, cross, point, ring
      
      // Animation settings
      speed: 1.0,                     // Animation speed multiplier (1.0 = normal)
      
      // Light mode settings
      light: {
        primaryDot: '#ff69b4',        // Primary dot color in light mode (pink)
        secondaryDot: '#6ea3ff',      // Secondary dot color in light mode
        opacity: 0.60                 // Opacity in light mode (0.0-1.0)
      },
      
      // Dark mode settings
      dark: {
        primaryDot: '#8ff5ff',        // Much brighter cyan for primary dot color in dark mode
        secondaryDot: '#ff8fd0',      // Much brighter pink for secondary dot color in dark mode
        opacity: 0.45                 // Significantly increased opacity for better visibility in dark mode (0.0-1.0)
      }
    };
    
    // Apply global settings (independent of theme) with console logging
    console.log('[bayerbg] Applying cell size:', CONFIG.cellSize);
    window.bayerBackground.setCellSize(CONFIG.cellSize);
    
    console.log('[bayerbg] Applying shape: circle');
    window.bayerBackground.setShape('circle'); // Explicitly force circle shape
    
    console.log('[bayerbg] Applying speed:', CONFIG.speed);
    window.bayerBackground.setSpeed(CONFIG.speed);
    
    // Track theme transitions to prevent overlapping animations
    let themeTransitionInProgress = false;
    let themeChangeRequested = false;
    let requestedTheme = '';
    
        // Add a flag to skip fade on first run
        let isFirstApply = true;
        // Apply theme-specific settings with proper transition
        const applyThemeSettings = () => {
          if (themeTransitionInProgress) {
            themeChangeRequested = true;
            requestedTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
            return;
          }
          themeTransitionInProgress = true;
          const isDarkMode = document.documentElement.classList.contains('dark');
          // Only fade out if not first apply
          if (!isFirstApply) {
            window.bayerBackground.setOpacity(0);
          }
          setTimeout(() => {
            // Set colors for the current theme
            let primaryColor, secondaryColor, opacity;
            if (isDarkMode) {
              primaryColor = CONFIG.dark.primaryDot;
              secondaryColor = CONFIG.dark.secondaryDot;
              opacity = CONFIG.dark.opacity;
              console.log('[bayerbg] Setting dark mode colors:', primaryColor, secondaryColor);
            } else {
              primaryColor = CONFIG.light.primaryDot;
              secondaryColor = CONFIG.light.secondaryDot;
              opacity = CONFIG.light.opacity;
              console.log('[bayerbg] Setting light mode colors:', primaryColor, secondaryColor);
            }
            window.bayerBackground.setDots(primaryColor, secondaryColor);
            // Fade in after color set
            setTimeout(() => {
              window.bayerBackground.setOpacity(opacity);
              if (isFirstApply) isFirstApply = false;
              console.log('[bayerbg] Theme changed to: ' + (isDarkMode ? 'dark' : 'light'));
              themeTransitionInProgress = false;
              // Check if another theme change was requested during this transition
              if (themeChangeRequested) {
                themeChangeRequested = false;
                const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
                if (requestedTheme !== currentTheme) {
                  applyThemeSettings();
                }
              }
            }, 50); // Short delay before fade-in
          }, isFirstApply ? 0 : 150); // No delay on first run
        };
    
    // Initial setup
    applyThemeSettings();
    
    // Listen for theme changes with debouncing to prevent rapid firing
    let themeChangeTimeout;
    window.addEventListener('themechange', () => {
      // Clear any pending theme changes
      clearTimeout(themeChangeTimeout);
      
      // Debounce the theme change to prevent multiple rapid changes
      themeChangeTimeout = setTimeout(() => {
        applyThemeSettings();
      }, 50);
    });
    
    // Force config application and verification - helps ensure settings are applied
    const verifySettings = () => {
      console.log('[bayerbg] Verifying settings application...');
      
      // Re-apply global settings to ensure they take effect
      window.bayerBackground.setCellSize(CONFIG.cellSize);
      window.bayerBackground.setShape('circle'); // Always force circle
      window.bayerBackground.setSpeed(CONFIG.speed);
      
      // Re-apply theme-specific settings
      applyThemeSettings();
      
      console.log('[bayerbg] Settings verified and reapplied');
    };
    
    // Initial configuration
    console.log('[bayerbg] Initial configuration applied');
    
    // Force a verification after a short delay to ensure settings take effect
    setTimeout(verifySettings, 500);
    
    // Add a debug command to manually force settings reapplication
    window.applyBayerSettings = verifySettings;
      
    // Return true to indicate success
    return true;
    } else {
      console.warn('[bayerbg-config] Background API not available yet, will retry in 300ms');
      return false;
    }
  }
  
  // Try to initialize immediately
  if (!initializeBackground()) {
    // If not successful, retry with increasing delays
    setTimeout(function() {
      if (!initializeBackground()) {
        console.log('[bayerbg-config] Second attempt, waiting longer...');
        setTimeout(function() {
          if (!initializeBackground()) {
            console.warn('[bayerbg-config] Background API still not available after multiple attempts.');
          }
        }, 500);
      }
    }, 300);
  }
});

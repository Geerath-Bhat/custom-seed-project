import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Layout component
import Header from '@/components/layout/Header';
// No Sidebar or Footer based on 'H + B' layout

// UI Components for Login Page
import BrandLogoBlock from '@/components/login_account_access_page/BrandLogoBlock';
import WelcomeMessage from '@/components/login_account_access_page/WelcomeMessage';
import LoginForm, { LoginFormValues } from '@/components/login_account_access_page/LoginForm';
import AuthActionButtons from '@/components/login_account_access_page/AuthActionButtons';
import SocialLoginButtons from '@/components/login_account_access_page/SocialLoginButtons';
import GuestAccessButton from '@/components/login_account_access_page/GuestAccessButton';
import RegistrationModal, { RegistrationFormValues } from '@/components/login_account_access_page/RegistrationModal';
import ThemeToggle from '@/components/login_account_access_page/ThemeToggle';

// Placeholder Data and Configuration
const welcomeData = {
  title: "Access Your Trading Dashboard",
  message: "Sign in to manage your portfolio, track market trends, and make informed decisions. Or continue as a guest for a limited view."
};

const socialProviders = ['google', 'microsoft']; // Example based on description
const allowGuest = true; // Based on description mentioning 'Continue as Guest'
const allowSignUp = true; // Based on description mentioning 'Sign Up'

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState<string | false>(false);
  const [isGuestLoading, setIsGuestLoading] = useState(false);
  const [isRegistrationLoading, setIsRegistrationLoading] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  // --- Placeholder Handler Functions --- 

  const handleLoginSubmit = async (values: LoginFormValues) => {
    setIsLoginLoading(true);
    console.log('Login attempt:', values);
    // Replace with actual login API call
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
    console.log('Login successful (simulated)');
    setIsLoginLoading(false);
    navigate('/dashboard'); // Redirect after successful login
  };

  const handleForgotPassword = () => {
    console.log('Forgot Password clicked');
    // Navigate to forgot password page or show modal
    alert('Forgot Password flow not implemented.'); 
  };

  const handleSignUpClick = () => {
    console.log('Sign Up clicked');
    setIsRegistrationModalOpen(true);
  };

  const handleSocialLogin = async (provider: string) => {
    setIsSocialLoading(provider);
    console.log(`Social login attempt with: ${provider}`);
    // Replace with actual social login API call
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
    console.log(`Social login successful with ${provider} (simulated)`);
    setIsSocialLoading(false);
    navigate('/dashboard'); // Redirect after successful login
  };

  const handleGuestAccess = async () => {
    setIsGuestLoading(true);
    console.log('Continue as Guest clicked');
    // Replace with guest session logic
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
    console.log('Guest access granted (simulated)');
    setIsGuestLoading(false);
    navigate('/dashboard'); // Redirect to guest dashboard view
  };

  const handleRegistrationSubmit = async (values: RegistrationFormValues) => {
    setIsRegistrationLoading(true);
    console.log('Registration attempt:', values);
    // Replace with actual registration API call
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
    console.log('Registration successful (simulated)');
    setIsRegistrationLoading(false);
    setIsRegistrationModalOpen(false);
    // Optionally login the user automatically or show success message
    navigate('/dashboard'); // Redirect after successful registration
  };

  // The form instance is within LoginForm, but we trigger submit via AuthActionButtons
  // We need a way to programmatically submit the form inside LoginForm.
  // A common way is using a ref or lifting the form state, but for simplicity,
  // we'll trigger the submit handler directly here if needed, assuming the form data is accessible
  // or handled internally by LoginForm on its own submit event if structure differs.
  // Here, we assume AuthActionButtons' onLoginClick directly calls handleLoginSubmit which has form values.
  // This requires LoginForm's internal form state/submit logic to be coordinated.
  // A more robust approach might involve passing the form instance or a submit trigger function down.
  // For this simulation, we pass handleLoginSubmit directly to AuthActionButtons' onLoginClick prop.
  const triggerLoginFormSubmit = () => {
     // This ideally triggers the react-hook-form submit associated with LoginForm
     // This might involve finding the form and calling submit() or using form context.
     // For now, we directly call the handler.
     // Note: This won't work correctly without access to the form's state/submit method.
     // A common pattern is to have the Button *inside* the form.
     // Since LoginForm doesn't have the button, we adapt. Let's refine LoginForm 
     // or how AuthActionButtons interacts with it. Assuming AuthActionButtons is INSIDE the CardContent
     // or can access the form context/trigger. Let's adjust the structure slightly for plausibility.
     // **Revised approach:** We'll keep AuthActionButtons separate but pass the submit handler.
     // LoginForm itself doesn't render a submit button.
     document.getElementById('login-form-submit-button')?.click(); // Hacky: find and click hidden submit if needed
     console.warn("Triggering form submit programmatically. Ensure LoginForm is set up for this.");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      {/* Main Content Area (B) */}
      <main className="flex flex-1 items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-6">
          
          {/* Theme Toggle - Placed near the form for easy access */}
          <div className="flex justify-end">
            <ThemeToggle />
          </div>

          {/* Component Order based on Page Data JSON */} 
          {/* 1. Brand/Logo */} 
          <BrandLogoBlock appName="Ascendion" />

          {/* 2. Text Block */} 
          <WelcomeMessage
            title={welcomeData.title}
            message={welcomeData.message}
          />

          {/* 3. Form (Card contains the form fields) */} 
          <LoginForm 
            onSubmit={handleLoginSubmit} 
            isLoading={isLoginLoading} 
            // We'll place AuthActionButtons below the form fields, 
            // ideally LoginForm would accept children or have a designated slot for actions
            // For now, LoginForm renders the card and fields, actions are below.
          />

          {/* 4. Button Group (Login, Forgot, Sign Up) */} 
          {/* These buttons often appear *within* the form card in UI patterns */}
          {/* To make this work with the current structure, place it nearby */}
          <AuthActionButtons
            onLoginClick={() => { 
              // This assumes LoginForm setup correctly handles submission via its internal form state 
              // when handleLoginSubmit is called. 
              // NOTE: Requires LoginForm's internal form to be submitted. 
              // A hidden submit button inside LoginForm triggered by this might be needed. 
              // Or LoginForm needs to expose its submit handler. 
               const loginForm = document.querySelector('form'); // Simple selector, might need refinement
               loginForm?.requestSubmit(); // Standard way to trigger form submission 
            }}
            onForgotPasswordClick={handleForgotPassword}
            onSignUpClick={handleSignUpClick}
            isLoginLoading={isLoginLoading}
            showSignUp={allowSignUp}
            className="mt-4" // Add margin if needed depending on LoginForm's structure
          />

          {/* 5. Social Login Group */} 
          <SocialLoginButtons
            providers={socialProviders}
            onSocialLogin={handleSocialLogin}
            isLoading={isSocialLoading}
          />

          {/* 6. Button (Guest Access) */} 
          <GuestAccessButton
            onGuestAccessClick={handleGuestAccess}
            isLoading={isGuestLoading}
            allowGuestAccess={allowGuest}
          />

          {/* 7. Modal (Registration) - Rendered but controlled by state */} 
          {/* ThemeToggle is handled separately above */} 

        </div>
      </main>

      {/* Render modal outside main flow */} 
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onOpenChange={setIsRegistrationModalOpen}
        onSubmit={handleRegistrationSubmit}
        isLoading={isRegistrationLoading}
      />
      {/* No Footer */} 
    </div>
  );
};

export default LoginPage;

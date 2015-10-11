T9n.setLanguage('en');
AccountsTemplates.configure({
  confirmPassword: true,
  enablePasswordChange: true,
  forbidClientAccountCreation: false,
  overrideLoginErrors: true,
  sendVerificationEmail: false,
  showAddRemoveServices: false,
  showForgotPasswordLink: true,
  showLabels: true,
  showPlaceholders: true,
  continuousValidation: false,
  negativeFeedback: false,
  negativeValidation: true,
  positiveValidation: true,
  positiveFeedback: true,
  privacyUrl: 'privacy',
  termsUrl: 'terms-of-use',
  homeRoutePath: '/',
  redirectTimeout: 4000,
});


AccountsTemplates.addFields([
  {
    _id: 'username',
    type: 'text',
    displayName: "Username",
    required: true,
    minLength: 3
  }
]);

AccountsTemplates.configureRoute('forgotPwd', {
    name: 'forgot',
    path: '/forgot',
    layoutTemplate: 'formLayout',
    redirect: '/'
});

AccountsTemplates.configureRoute('enrollAccount', {
    name: 'enroll',
    path: '/enroll',
    layoutTemplate: 'formLayout',
    redirect: '/'
});

AccountsTemplates.configureRoute('signUp', {
    name: 'signup',
    path: '/signup',
    layoutTemplate: 'formLayout',
    redirect: '/'
});

AccountsTemplates.configureRoute('signIn', {
    name: 'signin',
    path: '/signin',
    layoutTemplate: 'formLayout',
    redirect: '/'
});


Router.plugin('ensureSignedIn', {
    only: ['profile', 'admin']
});
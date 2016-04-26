import { AccountsTemplates } from 'meteor/useraccounts:core';
import { TAPi18n } from 'meteor/tap:i18n';

AccountsTemplates.configure({
    showForgotPasswordLink:true,
    texts:{
        errors:{
            loginForbidden:TAPi18n._('Incorrect username or password'),
            pwdMismatch:TAPi18n._('Passwords don\'t match'),
        },
        title:{
            signIn:TAPi18n._('Sign In'),
            signUp:TAPi18n._('Join')
        },
    },
    defaultTemplate:'Auth_page',
    defaultLayout:'App_body',
    defaultContentRegion:'main',
    defaultLayoutRegions:{},
});
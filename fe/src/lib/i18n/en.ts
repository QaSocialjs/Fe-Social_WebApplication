export const en = {
  translation: {
    authentication: {
      login: {
        header: {
          title: "Login",
          subtitle: "It's quick and easy.",
        },
        email: {
          label: "Email",
          require: "require",
          invalid: "Invalid email address",
        },
        password: {
          label: "Password",
          required: "Password is a required field",
          invalid: "Password must be at least 8 characters",
        },
        success: "Login successfully",
        confirmEmail: {
          text: "Are you sure you confirmed your account in the email? Because your account has not been confirmed yet.",
          buttonSend: "Confirm your email",
          buttonCancel: "Cancel",
        },
      },
      signup: {
        header: {
          title: "Signup",
          subtitle: "Quickly and easy",
        },
        email: {
          label: "Email address",
          required: "Email is a required field",
          invalid: "Invalid email address",
        },
        password: {
          label: "Password",
          required: "Password is a required field",
          invalid: "Password must be at least 8 characters",
        },
        confirmpassword: {
          label: "Confirm password",
          required: "ConfirmPassword is a required field",
          invalid: "Password not match",
        },
        firstname: {
          label: "First Name",
          required: "Firstname is a required field",
          invalid: "",
        },
        lastname: {
          label: "Last Name",
          required: "Lastname is a required field",
          invalid: "",
        },
        age: {
          label: "Date of birth",
          required: "Choose your birthday",
          invalid: "",
          max: "Your birthdate cannot be later than {{ date }}",
        },
        gender: {
          label: "Gender",
          required: "Please choose a gender",
          invalid: "Please choose a gender",
        },
        button: "Signup",
        success: "Signup successfully",
      },
      codeconfirm: {
        title: "Enter the code from your mail",
        text: "Let us know that this email address belongs to you. Enter the code from the email sent to  <1>{{email}}</1>",
        label: "Enter your code",
        buttonAccent: "Continue",
        buttonPrimary: "Update Contact Info",
        link: "Send Email Again",
        responseOk:
          "Please check your email, they sent a code in there, and come back here to enter that code.",
        modal: {
          title: "Email confirmation successful",
          text: "Congratulations, you have successfully confirmed your email, now you can log in and use the service.Congratulations, you have successfully confirmed your email, now you can log in and use the service.",
        },
      },
      footer: {
        signup: {
          title: "Already have an account?",
          link: "Login now",
          note: "People who use our service may have uploaded your contact information to qaSocialApp.",
          policy:
            "Learn more. By clicking Sign Up, you agree to our Terms, Privacy and Cookies Policy.",
        },
        login: {
          title: "Do you have an account?",
          link: "Signup now",
        },
      },
    },
    footer: {
      text: "All rights reserved.",
    },
    profile: {
      about: {
        "1": "Overview",
        "2": "Work and education",
        "3": "Places lived",
        "4": "Contact and basic info",
        "5": "Family and relationships",
        "6": "Details about you",
        "7": "Life Event",
        placelived: {
          required: "Please choose city.",
        },
        contactandinfo: {
          header: "Contact Info",
          gender: {
            label: "Gender",
            required: "Please choose a gender",
            invalid: "Please choose a gender",
          },
        },
        workandeducation: {
          work: {
            label: "Work",
            required: "Please enter your company.",
          },
          position: {
            label: "Position",
          },
          start: {
            required: "Start Date/Time is required.",
          },
          end: {
            invalid: "End date can't be before Start date.",
          },
        },
      },
    },
  },
};

export interface SignUp {
    first_name: string;
    last_name: string;
    company_name: string;
    email: string;
    password: string;
    referral_code?: string;
}

export interface Profile {
    first_name: string;
    last_name: string;
    company_name: string;
    email: string;
    password: string;
    referral_code?: string;
}

export interface SignIn {
    email: string,
    password: string
}

export interface VerifyEmail {
    email: string
}

export interface ResendEmail {
    email: string
    event: string
}

type RegisterUserData = {
    name: string;
    email: string;
    password: string;
};

export const registerUserService = (user: RegisterUserData) => {

    return {
        success: true,
        message: "Registration request processed successfully.",
        data: {
            name: user.name,
            email: user.email
        }
    };

};
type RegisterUserData = {
    name: string;
    email: string;
    password: string;
};

const users = [
    {
        id: 1,
        name: "Admin User",
        email: "admin@journeyai.com",
    },
    {
        id: 2,
        name: "Mohammad Ataf",
        email: "ataf@gmail.com",
    },
];

export const registerUserService = (user: RegisterUserData) => {

    const existingUser = users.find(
        (currentUser) => currentUser.email === user.email
    );

    if (existingUser) {
        return {
            success: false,
            message: "Email already exists.",
        };
    }

    return {
        success: true,
        message: "Registration request processed successfully.",
        data: {
            name: user.name,
            email: user.email,
        },
    };
};
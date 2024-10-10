const USER_SERVICE_URL = "http://localhost:8080";

export const login = async (email: string, password: string) => {
	const response = await fetch(`${USER_SERVICE_URL}/auth/login`, 
	{
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});

	if (!response.ok) throw new Error("Login failed");
	return await response.json();
};

export const register = async (
	name: string,
	email: string,
	password: string,
) => {
	const response = await fetch(`${USER_SERVICE_URL}/auth/register`, 
	{
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name, email, password }),
	});

	if (!response.ok) throw new Error("Registration failed");
	return await response.json();
};

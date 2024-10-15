import { fetch } from 'bun';

export class UserService {
  async registerUser(name: string, email: string, password: string) {
    const response = await fetch('http://users-microservice/api/v1/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    return await response.json();
  }

  async loginUser(email: string, password: string) {
    const response = await fetch(`http://users-microservice/api/v1/auth/login?email=${email}&password=${password}`);
    return await response.json();
  }

  async getUserById(userId: string) {
    const response = await fetch(`http://users-microservice/api/v1/users/${userId}`);
    if (response.status === 404) {
      return null;
    }
    return await response.json();
  }
}

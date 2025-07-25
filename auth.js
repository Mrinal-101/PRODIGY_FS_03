
const auth = {
  login(email, pass) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    let user  = users.find(u => u.email === email && u.pass === pass);
    if(user) {
      localStorage.setItem('session', user.email);
      return true;
    }
    return false;
  },
  signup(name, email, pass) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if(users.find(u => u.email === email)) return false;
    users.push({ email, pass, name });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('session', email);
    return true;
  },
  logout() {
    localStorage.removeItem('session');
  },
  isLoggedIn() {
    return !!localStorage.getItem('session');
  }
};



class Back{
    constructor() {
      const API = process.env.NEXT_PUBLIC_API
      this.url =  API
    
  }

    
    token() {
      return localStorage.getItem('token')
    }
    setToken(token) {
      localStorage.setItem('token', token)
    }

    post(route,body={}) {
      return fetch(`${this.url}/${route}`, 
      { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token()}` },
        body: body
      })
  }
    get(route){
      return fetch(`${this.url}/${route}`, 
      { 
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
  }
}
const req = new Back()
export default req

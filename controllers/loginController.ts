
export const loginController  = (app: any) => {

	app.get("/login", login)
	.post("/register", register)
}

const register = () => {
	return "register function"
}


const login = () => {
	return "Login function"
}

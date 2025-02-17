import React from 'react';
import LoginBg from '../../assets/images/loginbg.jpg';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const username = formData.get('email') as string;
        const password = formData.get('password') as string;
        console.log(username, password);

        // Call the login API here
        navigate('/users');
    };
    const [bgGradient, setBgGradient] = React.useState('from-teal-400 to-purple-500');

    React.useEffect(() => {
        const gradients = [
            'from-teal-400 to-purple-500',
            'from-pink-500 to-yellow-500',
            'from-blue-500 to-green-500'
        ];
        let index = 0;
        const interval = setInterval(() => {
            index = (index + 1) % gradients.length;
            setBgGradient(gradients[index]);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`bg-gradient-to-tr ${bgGradient} min-h-screen flex items-center justify-center transition-all duration-1000`}>

            <div className="max-w-md w-full h-64 bg-white p-8 rounded-lg shadow-lg mr-10 bg-cover bg-center text-white font-bold"
                style={{ backgroundImage: `url(${LoginBg})` }}
            >
                <div className='flex flex-col justify-center h-full bg-backdrop bg-opacity-50 bg-black p-4 rounded-lg'>
                    <h1 className="text-white font-bold text-lg">Login to Mediafy</h1>
                    <p className="text-white font-bold text-lg mt-2">
                        Welcome back! Login to your account to access all your media files.
                    </p>
                </div>
            </div>
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <form onSubmit={submitHandler}>
                    <div className="mb-4 flex flex-col p-2 justify-normal">
                        <label htmlFor="email" className="mb-2">Email</label>
                        <input type="text" id="email" name="email" className="bg-teal-200 rounded-lg p-2 shadow-md" />
                    </div>
                    <div className="mb-4 flex flex-col p-2 justify-normal">
                        <label htmlFor="password" className="mb-2">Password</label>
                        <input type="password" id="password" name="password" className="bg-teal-200 rounded-lg p-2 shadow-md" />
                    </div>
                    <button className="w-full rounded-lg bg-gradient-to-tr from-teal-400 to-purple-500 p-2 text-white font-bold"
                        type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};


export default Login;
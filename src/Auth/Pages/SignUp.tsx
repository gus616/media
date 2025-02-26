import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import SignUpBg from '../../assets/images/signupbg.jpg';
import { Link } from "react-router";


const SignUp = () => {

    const [bgGradient, setBgGradient] = useState('from-teal-400 to-purple-500');

    useEffect(() => {
        const gradients = [           
            'from-red-500 to-orange-500',
            'from-indigo-500 to-pink-500',
            'from-green-400 to-blue-500'
        ];
        let index = 0;
        const interval = setInterval(() => {
            index = (index + 1) % gradients.length;
            setBgGradient(gradients[index]);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // const response = await login({ email, password }).unwrap()        
            // dispatch(setToken(response.token));
            // navigate('/users');
        }
        catch (err) {
            console.log(err);
        }
    };
    return (
        <div className={`bg-gradient-to-tr ${bgGradient} min-h-screen flex items-center justify-center transition-all duration-1000`}>
            <ToastContainer />
            <div className="max-w-md w-full h-80 bg-white p-8 rounded-lg shadow-lg mr-10 bg-cover bg-center text-white font-bold"
                style={{ backgroundImage: `url(${SignUpBg})` }}
            >
                
                <div className='flex flex-col justify-center h-full bg-backdrop bg-opacity-50 bg-black p-4 rounded-lg'>
                    <h1 className="text-white font-bold text-lg">Sign Up to Mediafy!</h1>
                    <p className="text-white font-bold text-lg mt-2">
                        Create an account to store all your media files.
                    </p>
                </div>
            </div>
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <form onSubmit={submitHandler}>
                    <div className="mb-4 flex flex-col p-2 justify-normal">
                        <label htmlFor="name" className="mb-2">Full name</label>
                        <input type="text" id="name" name="name" className="bg-pink-200 rounded-lg p-2 shadow-md" />
                    </div>
                    <div className="mb-4 flex flex-col p-2 justify-normal">
                        <label htmlFor="email" className="mb-2">Email</label>
                        <input type="text" id="email" name="email" className="bg-pink-200 rounded-lg p-2 shadow-md" />
                    </div>
                    <div className="mb-4 flex flex-col p-2 justify-normal">
                        <label htmlFor="password" className="mb-2">Password</label>
                        <input type="password" id="password" name="password" className="bg-pink-200 rounded-lg p-2 shadow-md" />
                    </div>
                    <button className="w-full rounded-lg bg-gradient-to-tr from-indigo-400 to-pink-500 p-2 text-white font-bold"
                        type="submit"

                    >Sign Up</button>
                </form>
                {/*          {isError && (
                    <p className="text-red-500 mt-2">
                        Error: {'data' in error ? (error.data as { message: string }).message : 'error' in error ? error.error : error?.message}
                    </p>
                )} */}
                <p className="mt-4">Already have an account? <Link to="/" className="text-blue-500">Login</Link></p>

            </div>



        </div>
    );
};

export default SignUp;
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import SignUpBg from '../../assets/images/signupbg.jpg';
import { Link } from "react-router-dom"; // Updated import
import { useSignUpMutation } from "../../services/authApi";
import { CgSpinnerAlt } from "react-icons/cg";

const SignUp = () => {
    const [signUp, { isLoading, error, isError }] = useSignUpMutation();
    const [bgGradient, setBgGradient] = useState('from-teal-400 to-purple-500');
    const fullNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const gradients = [
            'from-pink-500 to-purple-500',
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

    useEffect(() => {
        if(isError) {

            if ('data' in error && error.data && typeof error.data === 'object' && 'errors' in error.data) {
                const errors = (error.data as { [key: string]: { [key: string]: string[] } }).errors;
                for (const key in errors) {
                    toast.error(errors[key].join(', '));
                }
                return;
            };

            if (error && typeof error === 'object' && 'data' in error && error.data && typeof error.data === 'object' && 'message' in error.data) {
                toast.error((error as { data: { message: string } }).data.message);
            } else {
                toast.error('An unknown error occurred');
            }
        }
    }, [error, isError]);



    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (!fullNameRef.current?.value || !emailRef.current?.value || !passwordRef.current?.value) {
                toast.error('Please fill all the fields');
                return;
            }

            const response = await signUp({
                fullName: fullNameRef.current?.value as string,
                email: emailRef.current?.value as string,
                password: passwordRef.current?.value as string
            }).unwrap();

            console.log(response);
        } catch (err) {
            console.error('Error during sign up:', err);
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
                        <input type="text" id="name" name="name" className="bg-pink-200 rounded-lg p-2 shadow-md" ref={fullNameRef} />
                    </div>
                    <div className="mb-4 flex flex-col p-2 justify-normal">
                        <label htmlFor="email" className="mb-2">Email</label>
                        <input type="text" id="email" name="email" className="bg-pink-200 rounded-lg p-2 shadow-md" ref={emailRef} />
                    </div>
                    <div className="mb-4 flex flex-col p-2 justify-normal">
                        <label htmlFor="password" className="mb-2">Password</label>
                        <input type="password" id="password" name="password" className="bg-pink-200 rounded-lg p-2 shadow-md" ref={passwordRef} />
                    </div>
                    <button className="flex justify-center items-center w-full rounded-lg bg-gradient-to-tr from-indigo-400 to-pink-500 p-2 text-white font-bold"
                        type="submit" disabled={isLoading}
                    >
                        {isLoading ? <CgSpinnerAlt className="animate-spin h-5 w-5 text-white" /> : 'Sign Up'}
                    </button>
                </form>
                <p className="mt-4">Already have an account? <Link to="/" className="text-blue-500">Login</Link></p>
            </div>
        </div>
    );
};

export default SignUp;
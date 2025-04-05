import { loginPageConfig } from '@constants';
import { QrScanner } from '@components';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useLoginByPassword } from '@queries';
import { useLocation } from 'react-router-dom';

export const LoginPage = () => {
    const {
        title,
        subTitle,
        logo,
        toggleTxt: { student, faculty },
    } = loginPageConfig;

    const initialState = {
        email: '',
        regNo: '',
        password: '',
    };

    const [isFaculty, setIsFaculty] = useState(false);
    const [loginData, setLoginData] = useState(initialState);
    const [scan, setScan] = useState(false);
    const { pathname } = useLocation();
    const path = pathname === '/met/admin' ? 'admin' : isFaculty ? 'faculty' : 'student';
    const loginByPassword = useLoginByPassword();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        loginByPassword.mutate({ path, loginData });
    };
    const renderLoginForm = () => (
        <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
            <input
                name='email'
                type='email'
                placeholder='Enter Your Email'
                autoComplete='off'
                className='p-4 border-2 text-font-primary border-primary rounded-2xl outline-none'
                value={loginData.email}
                onChange={handleChange}
            />

            <input
                name='password'
                type='password'
                placeholder='Enter Your Password'
                autoComplete='off'
                className='p-4 border-2 text-font-primary border-primary rounded-2xl outline-none'
                value={loginData.password}
                onChange={handleChange}
            />
            <button type='submit' className='bg-primary text-font-primary py-4 rounded-2xl cursor-pointer'>
                Login
            </button>
        </form>
    );

    return (
        <div className='relative w-full h-screen bg-background overflow-hidden flex items-center justify-center font-primary'>
            <div className='absolute top-0 left-0 bg-primary h-full w-full md:w-[80%] [clip-path:polygon(0%_0%,30%_0%,70%_100%,0%_100%)]'></div>
            <div className='relative py-10 lg:px-10 z-10 bg-background w-[90%] h-[80vh] flex flex-col lg:flex-row items-center justify-center rounded-2xl gap-10'>
                <div className='lg:w-1/2 text-font-primary flex flex-col lg:flex-row items-center justify-center gap-6'>
                    <div className='w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0'>
                        <img src={logo} alt='logo' />
                    </div>
                    <div className='font-medium text-xl sm:text-3xl flex-shrink-0'>
                        <h1 className='text-center lg:text-left'>{title}</h1>
                        <h2>{subTitle}</h2>
                    </div>
                </div>
                <div className='lg:w-1/2 w-full flex items-center justify-center font-medium'>
                    <div className='pl-2 xs:pl-0 min-w-[280px] sm:min-w-96'>
                        {scan ? null : renderLoginForm()}
                        {scan && <QrScanner scan={scan} setScan={setScan} path={path} />}
                        <div className='text-primary-dark font-medium flex justify-between items-center mt-2  cursor-pointer'>
                            {path === 'admin' ? null : (
                                <div
                                    className='ml-1'
                                    onClick={() => {
                                        setLoginData(initialState);
                                        setIsFaculty(!isFaculty);
                                    }}
                                >
                                    {isFaculty ? faculty : student}
                                </div>
                            )}
                            <div className='mr-1' onClick={() => setScan((prev) => !prev)}>
                                {scan ? 'Stop' : 'Login Using QR'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

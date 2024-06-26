import './Header.css';
import { icons, images } from '../../utils/images';
import { useDispatch, useSelector } from 'react-redux';
import { setToggleSidebar } from '../../store/Slices/sidebarSlice';
import { useEffect } from 'react';
import {
    setDropdownVisible,
    setToggleDropdown,
} from '../../store/Slices/contentTopSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isDropdownVisible, dropdown } = useSelector((state) => {
        return state.contentTop;
    });

    const { isAdmin } = useSelector((state) => {
        return state.adminRole;
    });

    let { yourProfile } = useSelector((state) => {
        return state.homeData;
    });

    const sessionData = JSON.parse(sessionStorage.getItem('homeData'));
    if (sessionData != null) {
        yourProfile = {
            image: sessionData.Image,
            name: sessionData.name,
        };
    }

    console.log(isAdmin);

    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 824 && window.innerWidth <= 825) {
                dispatch(setDropdownVisible(true));
            } else if (window.innerWidth >= 826 && window.innerWidth <= 827) {
                dispatch(setDropdownVisible(false));
            }
        });
    }, []);

    useEffect(() => {
        if (window.innerWidth <= 825) {
            dispatch(setDropdownVisible(true));
        }
    }, []);

    return (
        <div className='content-top'>
            <div className='content-top-left'>
                <div
                    className='menu-icon'
                    onClick={() => dispatch(setToggleSidebar())}
                >
                    <img src={icons.menu} alt='menu' />
                </div>
                <div className='menu-txt'>Home</div>
            </div>
            <div className='content-top-right'>
                <div
                    className='avatar'
                    onClick={() => dispatch(setToggleDropdown())}
                >
                    {isAdmin == true ? (
                        <>
                            <div className='profile-name'>ADMIN</div>
                        </>
                    ) : (
                        <>
                            <div className='profile-pic'>
                                <img
                                    src={`http://localhost:8000/img/${yourProfile.image}`}
                                    alt='profile'
                                />
                            </div>
                            <div className='profile-name'>
                                {yourProfile.name}
                            </div>
                        </>
                    )}
                    {isDropdownVisible ? (
                        <>
                            <div className='dropdown-btn'>
                                <img src={icons.dropdown} alt='dropdown' />
                            </div>
                        </>
                    ) : null}
                    <ul className={`dropdown ${dropdown}`}>
                        <li>
                            <div
                                className='dropdown-txt'
                                onClick={() => {
                                    navigate('/', { replace: true });
                                }}
                            >
                                Log Out
                            </div>
                        </li>
                        {/* <li>
                            <div className='dropdown-icon'>
                                <img src={icons.gear} alt='darktheme' />
                            </div>
                            <div className='dropdown-txt'>darkmode</div>
                        </li>
                        <li>
                            <div className='dropdown-icon'>
                                <img src={icons.bell} alt='notification' />
                            </div>
                            <div className='dropdown-txt'>notification</div>
                        </li> */}
                    </ul>
                </div>
                <button
                    className='logout-btn'
                    onClick={() => {
                        // navigate('/');
                        // window.history.replaceState({}, '');
                        navigate('/', { replace: true });
                    }}
                >
                    Log Out
                </button>
                {/* <div className='dark-theme-btn'>
                    <img src={icons.gear} alt='dark-theme' />
                </div>
                <div className='notification-btn'>
                    <img src={icons.bell} alt='notification' />
                </div> */}
            </div>
        </div>
    );
};

export default Header;

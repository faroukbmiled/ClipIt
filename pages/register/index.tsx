import Head from 'next/head';
import { useState, useEffect } from 'react';
import ClipiTLogo from '../../src/assets/imgs/ClipiT-logo.png';
import galleryadd from '../../src/assets/icons/galleryadd.svg';
import Link from 'next/link';
import Select from 'react-select';
import { getCode, getNames } from 'country-list'; // Updated import

export default function Register() {
  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  const displayFileName = (event) => {
    const fileInput = event.target as HTMLInputElement;
    const fileName = fileInput.files[0]?.name || '';
    setSelectedFileName(fileName);
  };

  useEffect(() => {
    setSelectedCountry({ value: 'Tn', label: 'Tunisia' });
  }, []);

  const countryOptions = {
    options: Object.keys(getNames()).map((code) => ({
      value: code,
      label: getNames()[code],
    })),
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };
    return (
        <div className='body fl_row w-100vw'>
            <Head>
                <title>register</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main id='register-auth' className='auth-layout w-100vw'>
                <div className="auth-wrapper fl_row h-100vh">
                    <div className='left-side fl-1 h-100 fl_col gp25 ai_c jc_fe '>
                        <div className="left-side-wrapper txt_center pd40-r-l">
                            <p className="p40 w-700 txt_white">Turn your ideas into reality.</p>
                            <p className="p22 w-300 txt_white">Start for free and get attractive offers from the community</p>
                        </div>
                    </div>
                    <div className='right-side fl-1 h-100  fl_col ai_c jc_c'>
                        <div className="right-side-wrapper w-100 fl_col gp30">
                            <div className='fl_row jc_c'>
                                <img className='logo' src={ClipiTLogo.src} alt="" />
                            </div>
                            <div className='form-header fl_col gp2 txt_grey txt_left'>
                                <div className='fl_col gp32'>
                                    <div className='fl_col'>
                                        <p className="p36">Create New Account</p>
                                        <p className="p16">See what is going on with your business</p>
                                    </div>
                                </div>
                            </div>
                            <form action="">
                                <div className='form-fields fl_col gp40'>
                                    <div className='light-input inp-row gp20'>
                                        <div className='inp_col fl_col fl-1'>
                                            <label htmlFor="email">Email</label>
                                            <input className='p12' id='email' type="email" placeholder='mail@clipit.com' />
                                        </div>
                                        <div className='inp_col fl_col fl-1'>
                                            <label htmlFor="username">Username</label>
                                            <input className='p12' id='username' type="text" placeholder='*****************' />
                                        </div>
                                    </div>
                                    <div className='light-input inp-row gp20'>
                                        <div className='inp_col fl_col fl-1'>
                                            <label htmlFor="password">Password</label>
                                            <input className='p12' id='password' type="password" placeholder='*******************' />
                                        </div>
                                        <div className='inp_col fl_col fl-1'>
                                            <label htmlFor="password">Retype Password</label>
                                            <input className='p12' id='password' type="password" placeholder='*******************' />
                                        </div>
                                    </div>
                                    <div className="uploadImg inp_col fl_row fl-1 bg_primary rd10 txt_white jc_s ai_c pd28-r-l pd15-t-b">
                                        <div className='fl_row ai_c gp10'>
                                            <img src={galleryadd.src} alt="" />
                                            <label htmlFor="file">Select an image</label>
                                        </div>
                                        <input type="file" id="file" name="file" accept="image/*" onChange={displayFileName} style={{ display: 'none' }} />
                                        <p className="p10">{selectedFileName}</p>
                                        <p className="p10 ">PNG,JPEG Max 5MB</p>
                                    </div>
                                    <div className="country-select">
                                        <label htmlFor="country">Select your country</label>
                                        <Select
                                            id="country"
                                            name="country"
                                            {...countryOptions}
                                            value={selectedCountry}
                                            onChange={handleCountryChange}
                                        />
                                    </div>

                                    <div className='fl_row jc_s'>
                                        <a href="">
                                            <p className="p12 txt_primary">Forgot Password?</p>
                                        </a>
                                    </div>
                                </div>
                                <button className='fl_row btn btn-primary p18 mg35-t-b txt_center w-100 jc_c w-500'>Register</button>
                                <div className="fl_row jc_c p15 gp10 p14">
                                    <p className='txt_grey'>Have an Account ?</p>
                                    <Link className='txt_primary' href={'/login'}>Login in Now !</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
function setSelectedCountry(selectedOption: any) {
    throw new Error('Function not implemented.');
}

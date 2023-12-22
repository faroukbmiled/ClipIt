import Head from 'next/head';
import ClipiTLogo from '../../src/assets/imgs/ClipiT-logo.png';
import GmailIcon from '../../src/assets/Icons/google.svg';
import Link from 'next/link';
export default function Login() {
  return (
    <div className='body fl_row w-100vw'>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main id='login-auth' className='auth-layout w-100vw'>
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
                    <p className="p36">Login to your Account</p>
                    <p className="p16">See what is going on with your business</p>
                  </div>
                  <button className="btn btn-light gp5 p12">
                    <img src={GmailIcon.src} alt="" />
                    Continue with Google
                  </button>
                  <p className="p12 txt_center txt_darkGrey w-400">------------- or Sign in with Email ------------- </p>
                </div>
              </div>
              <form action="">
                <div className='form-fields fl_col gp10'>
                  <div className='light-input fl_col gp20'>
                    <div className='inp_col fl_col'>
                      <label htmlFor="email">Email</label>
                      <input className='p12' id='email' type="email" placeholder='mail@clipit.com' />
                    </div>
                    <div className='inp_col fl_col'>
                      <label htmlFor="password">Password</label>
                      <input className='p12' id='password' type="password" placeholder='*****************' />
                    </div>
                  </div>
                  <div className='fl_row jc_s'>
                    <div className='fl_row gp5 ai_c'>
                      <input className='p12' type="checkbox" name="remmeberme" id="remmeberme" />
                      <label className='p12' htmlFor="remmeberme">Remember Me</label>
                    </div>
                    <a href="">
                      <p className="p12 txt_primary">Forgot Password?</p>
                    </a>
                  </div>
                </div>
                <button className='fl_row btn btn-primary p18 mg35-t-b txt_center w-100 jc_c w-500'>Login</button>
                <div className="fl_row jc_c p15 gp10 p14">
                  <p className='txt_grey'>Not Registered Yet?</p>
                  <Link className='txt_primary' href={'/register'}>Create an account</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

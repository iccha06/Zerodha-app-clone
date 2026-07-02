import React from 'react';

function OpenAccount() {
    const handleSignup = () => {
    // Dashboard URL (Development)
    window.location.href = `${import.meta.env.VITE_DASHBOARD_URL}/`;
  };
    return (
        <div className='container py-5 mb-5'>

            <div className='row text-center justify-content-center'>

                <div className='col-lg-8'>

                    <h1 className='mt-5 mb-3' style={{fontSize:35}}>
                        Open a Zerodha account
                    </h1>

                    <p className='text-muted mb-4'>
                        Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.
                    </p>

                    <button
                        className='btn btn-primary fs-5 px-4 py-2' onClick={handleSignup}
                    >
                        Sign up for free
                    </button>

                </div>

            </div>
        </div>
    );
}

export default OpenAccount;
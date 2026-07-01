import React from 'react';

function CreateTickets() {

    const ticketSections = [
        {
            title: "Account opening",
            icon: "fa-circle-plus",
            links: [
                "Resident individual",
                "Minor",
                "Non Resident Indian (NRI)",
                "Company, Partnership, HUF and LLP",
                "Glossary",
            ],
        },
        {
            title: "Your Zerodha account",
            icon: "fa-user",
            links: [
                "Your Profile",
                "Account modification",
                "Client Master Report (CMR)",
                "Nomination",
                "Transfer and conversion of shares",
            ],
        },
        {
            title: "Kite",
            icon: "fa-chart-line",
            links: [
                "IPO",
                "Trading FAQs",
                "Margin Trading Facility (MTF)",
                "Charts and orders",
                "Alerts and Nudges",
            ],
        },
        {
            title: "Funds",
            icon: "fa-wallet",
            links: [
                "Add money",
                "Withdraw funds",
                "Add bank accounts",
                "eMandates",
                "Fund withdrawal status",
            ],
        },
        {
            title: "Console",
            icon: "fa-desktop",
            links: [
                "Portfolio",
                "Corporate actions",
                "Tax P&L",
                "Reports",
                "Ledger and statements",
            ],
        },
        {
            title: "Coin",
            icon: "fa-coins",
            links: [
                "Mutual funds",
                "SIP",
                "Direct mutual funds",
                "Demat holdings",
                "Coin app issues",
            ],
        },
    ];

    return (

        <div className='container py-5'>

            {/* Heading */}
            <div className='row mb-5'>

                <div className='col-lg-8'>

                    <h1
                        className='fw-semibold'
                        style={{
                            fontSize: "42px",
                            color: "#424242"
                        }}
                    >
                        Create a ticket
                    </h1>

                    <p
                        className='text-muted mt-3'
                        style={{
                            fontSize: "18px",
                            lineHeight: "1.8"
                        }}
                    >
                        Select a relevant topic to quickly find help
                        and raise a support ticket.
                    </p>

                </div>

            </div>

            {/* Cards */}
            <div className='row g-4'>

                {ticketSections.map((section, index) => (

                    <div className='col-lg-4 col-md-6' key={index}>

                        <div
                            className='h-100 bg-white shadow-sm p-4 ticket-card'
                            style={{
                                borderRadius: "18px",
                                border: "1px solid #f0f0f0",
                                transition: "0.3s"
                            }}
                        >

                            {/* Title */}
                            <h5
                                className='fw-semibold mb-4'
                                style={{
                                    color: "#424242"
                                }}
                            >
                                <i className={`fa-solid ${section.icon} me-2 text-primary`}></i>

                                {section.title}
                            </h5>

                            {/* Links */}
                            <div className='d-flex flex-column gap-3'>

                                {section.links.map((link, idx) => (

                                    <a
                                        key={idx}
                                        href='/'
                                        className='ticket-link'
                                        style={{
                                            textDecoration: "none",
                                            color: "#387ed1",
                                            fontSize: "15px"
                                        }}
                                    >
                                        {link}
                                    </a>

                                ))}

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );
}

export default CreateTickets;
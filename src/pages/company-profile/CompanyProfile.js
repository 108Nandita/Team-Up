import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/nav-bar/NavBar';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';

function CompanyProfile() {
    const navigate = useNavigate();
    const [companyProfile, setCompanyProfile] = useState(null);
    const [logoURL, setLogoURL] = useState(null);

    useEffect(() => {
        const storedCompanyProfile = localStorage.getItem('companyProfile');
        if (storedCompanyProfile) {
            const parsedCompanyProfile = JSON.parse(storedCompanyProfile);
            setCompanyProfile(parsedCompanyProfile);

            if (parsedCompanyProfile.logo instanceof File) {
                const reader = new FileReader();
                reader.onload = () => {
                    setLogoURL(reader.result);
                };
                reader.readAsDataURL(parsedCompanyProfile.logo);
            } else if (parsedCompanyProfile.logo) {
                setLogoURL(parsedCompanyProfile.logo);
            }
        }
    }, []);

    return (
        <>
            <NavBar />
            <div>
                <header className="outer-container header-company">
                    <div className="profile-container">
                        <h1>
                            <strong>Profile</strong>
                        </h1>
                        <br />
                        {logoURL && <img className="company-logo" id="company-logo" src={logoURL} alt="Company Logo" style={{ width: '100px', height: 'auto' }} />}
                    </div>
                </header>
                <main className="outer-container">
                    <div className="inner-container">
                        <section>
                            <Button type="button" className="details" isDisabled={false} clickHandler={() => navigate('/company-profile')}>
                                Details
                            </Button>

                            <Button type="button" className="event" isDisabled={false} clickHandler={() => navigate('/company-profile')}>
                                Event
                            </Button>

                            <Button type="button" className="history" isDisabled={false} clickHandler={() => navigate('/company-profile')}>
                                History
                            </Button>

                            <Button type="button" className="finance" isDisabled={false} clickHandler={() => navigate('/company-profile')}>
                                Finance
                            </Button>

                            <Button type="button" className="forms" isDisabled={false} clickHandler={() => navigate('/company-profile')}>
                                Forms
                            </Button>
                        </section>
                        <br />
                        <br />
                        {companyProfile && (
                            <form>
                                <Input
                                    label="Company name"
                                    name="companyName"
                                    type="text"
                                    value={companyProfile.companyName}
                                    readOnly
                                />

                                <br />
                                <br />

                                <Input
                                    label="City"
                                    name="city"
                                    type="text"
                                    value={companyProfile.city}
                                    readOnly
                                />

                                <br />
                                <br />

                                <Input
                                    label="Address"
                                    name="address"
                                    type="text"
                                    value={companyProfile.address}
                                    readOnly
                                />

                                <br />
                                <br />

                                <Input
                                    label="PostalCode"
                                    name="postalCode"
                                    type="text"
                                    value={companyProfile.postalCode}
                                    readOnly
                                />

                                <br />
                                <br />

                                <Input
                                    label="PhoneNumber"
                                    name="phoneNumber"
                                    type="text"
                                    value={companyProfile.phoneNumber}
                                    readOnly
                                />

                                <br />
                                <br />

                                <Input
                                    label="ContactPerson"
                                    name="contactPerson"
                                    type="text"
                                    value={companyProfile.contactPerson}
                                    readOnly
                                />

                            </form>
                        )}
                        <br />
                        <br />
                    </div>
                </main>
            </div>
        </>
    );
}

export default CompanyProfile;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/nav-bar/NavBar';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';

function CreateCompany() {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        companyName: '',
        city: '',
        address: '',
        postalCode: '',
        phoneNumber: '',
        contactPerson: '',
        logo: null,
    });

    function handleFormChange(e) {
        const { name, value, files } = e.target;
        if (files && files[0]) {
            setFormState((prevFormState) => ({
                ...prevFormState,
                [name]: files[0],
            }));
        } else {
            setFormState((prevFormState) => ({
                ...prevFormState,
                [name]: value,
            }));
        }
    }

    function handleLogoChange(e) {
        const logoFile = e.target.files[0];
        setFormState((prevFormState) => ({ ...prevFormState, logo: logoFile }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const companyProfile = {
            ...formState,
            logo: formState.logo ? URL.createObjectURL(formState.logo) : null,
        };
        localStorage.setItem('companyProfile', JSON.stringify(companyProfile));
        navigate('/company-profile');
    }

    return (
        <>
            <NavBar />

            <div>

                <header className="outer-container">
                    <div className="profile-container">
                        <h1>
                            <strong>Create Company</strong>
                        </h1>
                    </div>
                </header>

                <main className="outer-container">
                    <div className="inner-container">
                        <form onSubmit={handleSubmit}>
                            <Input
                                label="Company name"
                                name="companyName"
                                type="text"
                                value={formState.companyName}
                                onChange={handleFormChange}
                            />

                            <br />
                            <br />

                            <Input
                                label="City"
                                name="city"
                                type="text"
                                value={formState.city}
                                onChange={handleFormChange}
                            />

                            <br />
                            <br />

                            <Input
                                label="Address"
                                name="address"
                                type="text"
                                value={formState.address}
                                onChange={handleFormChange}
                            />

                            <br />
                            <br />

                            <Input
                                label="PostalCode"
                                name="postalCode"
                                type="text"
                                value={formState.postalCode}
                                onChange={handleFormChange}
                            />

                            <br />
                            <br />

                            <Input
                            label="PhoneNumber"
                            name="phoneNumber"
                            type="text"
                            value={formState.phoneNumber}
                            onChange={handleFormChange}
                        />

                            <br />
                            <br />

                            <Input
                                label="ContactPerson"
                                name="contactPerson"
                                type="text"
                                value={formState.contactPerson}
                                onChange={handleFormChange}
                            />

                            <br />
                            <br />

                            <div className="form-group">
                                <label htmlFor="logo" style={{ display: 'inline-block', width: '140px' }}>
                                    Logo:
                                </label>
                                <input
                                    type="file"
                                    name="logo"
                                    id="logo"
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                    style={{ display: 'inline-block' }}
                                />
                            </div>

                            <br />
                            <br />

                            <Button type="submit" isDisabled={false} clickHandler={handleSubmit}>
                                Create Company
                            </Button>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}

export default CreateCompany;
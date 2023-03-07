import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { onAuthStateChanged } from "firebase/auth";
import { initialize } from "@/firebase";
import { toast } from "react-toastify";
import FormSummary from "@/components/formSummary";
import Container from "@/components/UI/container";
import { FormGroup, Label } from "@/components/UI/formComponents";
import { useCartStore } from "@/store/cart";
import Layout from "@/components/layout";
import { NextPageWithLayout } from "./_app";

export type Inputs = {
    name: string;
    email: string;
    phone: string;
    address: string;
    zip: string;
    city: string;
    country: string;
};

const Checkout: NextPageWithLayout = () => {
    const { back } = useRouter();
    const { cart, user } = useCartStore();
    const { fireStore, auth } = initialize();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (!user) {
                back();
            }
        });
    }, []);

    const onSubmit: SubmitHandler<Inputs> = data => {
        if (!cart.length) {
            toast.error("Can't checkout with empty cart!");
            return;
        }
        console.log({ ...data });
    };

    return (
        <Container>
            <div className='w-11/12 mx-auto my-4'>
                <button
                    className='bg-[#f2f2f2] p-2 rounded-2xl'
                    onClick={() => back()}>
                    Go Back
                </button>

                <p className='text-[#cd2c2c] italic text-xl my-4'>
                    *Please fill all input fields!
                </p>

                <form className='mt-8' onSubmit={handleSubmit(onSubmit)}>
                    <div className='items-start gap-8 xl:flex'>
                        <div className='bg-[#fff] h-auto rounded-lg p-4 basis-3/4'>
                            <h1 className='uppercase font-bold tracking-[1px] mb-4'>
                                checkout{" "}
                            </h1>

                            {/* billing details */}
                            <div>
                                <h2 className='text-xs font-bold uppercase tracking-[1px] text-[#e33f3f]'>
                                    billing details
                                </h2>

                                <div className='grid-cols-2 md:grid md:gap-4'>
                                    <FormGroup>
                                        <div className='flex justify-between'>
                                            <Label name={"name"} />
                                            {errors.name && (
                                                <p
                                                    role='alert'
                                                    className='text-xs text-red-500'>
                                                    Maximum of 10 chars!
                                                </p>
                                            )}
                                        </div>
                                        <input
                                            type='text'
                                            id='name'
                                            placeholder='sam'
                                            {...register("name", {
                                                required: true,
                                                maxLength: 10,
                                            })}
                                            aria-invalid={
                                                errors.name ? "true" : "false"
                                            }
                                            className={`input ${
                                                errors.name && "input-error"
                                            }`}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <div className='flex justify-between'>
                                            <Label name={"email address"} />
                                            {errors.email && (
                                                <p
                                                    role='alert'
                                                    className='text-xs text-red-500'>
                                                    Inavlid format!
                                                </p>
                                            )}
                                        </div>
                                        <input
                                            type='email'
                                            id='email address'
                                            placeholder='sam@xyz.com'
                                            {...register("email", {
                                                required: true,
                                                pattern:
                                                    /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/,
                                            })}
                                            aria-invalid={
                                                errors.name ? "true" : "false"
                                            }
                                            className={`input ${
                                                errors.email && "input-error"
                                            }`}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <div className='flex justify-between'>
                                            <Label name={"phone number"} />
                                            {errors.phone && (
                                                <p
                                                    role='alert'
                                                    className='text-xs text-red-500'>
                                                    Enter phone number!
                                                </p>
                                            )}
                                        </div>
                                        <input
                                            type='tel'
                                            id='phone number'
                                            placeholder='+123-456-789'
                                            {...register("phone", {
                                                required: true,
                                            })}
                                            className={`input ${
                                                errors.phone && "input-error"
                                            }`}
                                        />
                                    </FormGroup>
                                </div>
                            </div>

                            {/* shipping info */}
                            <div className='mt-8'>
                                <h2 className='text-xs font-bold uppercase tracking-[1px] text-[#e33f3f]'>
                                    shipping info
                                </h2>

                                <div className='grid-cols-2 md:grid md:gap-4'>
                                    <FormGroup>
                                        <div className='flex justify-between'>
                                            <Label name={"your address"} />
                                            {errors.address && (
                                                <p
                                                    role='alert'
                                                    className='text-xs text-red-500'>
                                                    Enter address!
                                                </p>
                                            )}
                                        </div>
                                        <input
                                            type='text'
                                            id='your address'
                                            placeholder='113 williams avenue'
                                            {...register("address", {
                                                required: true,
                                            })}
                                            className={`input ${
                                                errors.address && "input-error"
                                            }`}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <div className='flex justify-between'>
                                            <Label name={"zip code"} />
                                            {errors.zip && (
                                                <p
                                                    role='alert'
                                                    className='text-xs text-red-500'>
                                                    Enter valid zip code!
                                                </p>
                                            )}
                                        </div>
                                        <input
                                            type='number'
                                            id='zip code'
                                            placeholder='100001'
                                            {...register("zip", {
                                                required: true,
                                            })}
                                            className={`input ${
                                                errors.zip && "input-error"
                                            }`}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <div className='flex justify-between'>
                                            <Label name={"city"} />
                                            {errors.city && (
                                                <p
                                                    role='alert'
                                                    className='text-xs text-red-500'>
                                                    Select city!
                                                </p>
                                            )}
                                        </div>

                                        <input
                                            type='text'
                                            id='city'
                                            placeholder='lagos'
                                            {...register("city", {
                                                required: true,
                                            })}
                                            className={`input ${
                                                errors.city && "input-error"
                                            }`}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <div className='flex justify-between'>
                                            <Label name={"country"} />
                                            {errors.country && (
                                                <p
                                                    role='alert'
                                                    className='text-xs text-red-500'>
                                                    Enter country!
                                                </p>
                                            )}
                                        </div>
                                        <select
                                            id='country'
                                            {...register("country", {
                                                required: true,
                                            })}
                                            className={`input ${
                                                errors.country && "input-error"
                                            }`}>
                                            <option value=''>
                                                --Select country--
                                            </option>
                                            <option value='AF'>
                                                Afghanistan
                                            </option>
                                            <option value='AX'>
                                                Aland Islands
                                            </option>
                                            <option value='AL'>Albania</option>
                                            <option value='DZ'>Algeria</option>
                                            <option value='AS'>
                                                American Samoa
                                            </option>
                                            <option value='AD'>Andorra</option>
                                            <option value='AO'>Angola</option>
                                            <option value='AI'>Anguilla</option>
                                            <option value='AQ'>
                                                Antarctica
                                            </option>
                                            <option value='AG'>
                                                Antigua and Barbuda
                                            </option>
                                            <option value='AR'>
                                                Argentina
                                            </option>
                                            <option value='AM'>Armenia</option>
                                            <option value='AW'>Aruba</option>
                                            <option value='AU'>
                                                Australia
                                            </option>
                                            <option value='AT'>Austria</option>
                                            <option value='AZ'>
                                                Azerbaijan
                                            </option>
                                            <option value='BS'>Bahamas</option>
                                            <option value='BH'>Bahrain</option>
                                            <option value='BD'>
                                                Bangladesh
                                            </option>
                                            <option value='BB'>Barbados</option>
                                            <option value='BY'>Belarus</option>
                                            <option value='BE'>Belgium</option>
                                            <option value='BZ'>Belize</option>
                                            <option value='BJ'>Benin</option>
                                            <option value='BM'>Bermuda</option>
                                            <option value='BT'>Bhutan</option>
                                            <option value='BO'>Bolivia</option>
                                            <option value='BQ'>
                                                Bonaire, Sint Eustatius and Saba
                                            </option>
                                            <option value='BA'>
                                                Bosnia and Herzegovina
                                            </option>
                                            <option value='BW'>Botswana</option>
                                            <option value='BV'>
                                                Bouvet Island
                                            </option>
                                            <option value='BR'>Brazil</option>
                                            <option value='IO'>
                                                British Indian Ocean Territory
                                            </option>
                                            <option value='BN'>
                                                Brunei Darussalam
                                            </option>
                                            <option value='BG'>Bulgaria</option>
                                            <option value='BF'>
                                                Burkina Faso
                                            </option>
                                            <option value='BI'>Burundi</option>
                                            <option value='KH'>Cambodia</option>
                                            <option value='CM'>Cameroon</option>
                                            <option value='CA'>Canada</option>
                                            <option value='CV'>
                                                Cape Verde
                                            </option>
                                            <option value='KY'>
                                                Cayman Islands
                                            </option>
                                            <option value='CF'>
                                                Central African Republic
                                            </option>
                                            <option value='TD'>Chad</option>
                                            <option value='CL'>Chile</option>
                                            <option value='CN'>China</option>
                                            <option value='CX'>
                                                Christmas Island
                                            </option>
                                            <option value='CC'>
                                                Cocos (Keeling) Islands
                                            </option>
                                            <option value='CO'>Colombia</option>
                                            <option value='KM'>Comoros</option>
                                            <option value='CG'>Congo</option>
                                            <option value='CD'>
                                                Congo, Democratic Republic of
                                                the Congo
                                            </option>
                                            <option value='CK'>
                                                Cook Islands
                                            </option>
                                            <option value='CR'>
                                                Costa Rica
                                            </option>
                                            <option value='CI'>
                                                Cote D'Ivoire
                                            </option>
                                            <option value='HR'>Croatia</option>
                                            <option value='CU'>Cuba</option>
                                            <option value='CW'>Curacao</option>
                                            <option value='CY'>Cyprus</option>
                                            <option value='CZ'>
                                                Czech Republic
                                            </option>
                                            <option value='DK'>Denmark</option>
                                            <option value='DJ'>Djibouti</option>
                                            <option value='DM'>Dominica</option>
                                            <option value='DO'>
                                                Dominican Republic
                                            </option>
                                            <option value='EC'>Ecuador</option>
                                            <option value='EG'>Egypt</option>
                                            <option value='SV'>
                                                El Salvador
                                            </option>
                                            <option value='GQ'>
                                                Equatorial Guinea
                                            </option>
                                            <option value='ER'>Eritrea</option>
                                            <option value='EE'>Estonia</option>
                                            <option value='ET'>Ethiopia</option>
                                            <option value='FK'>
                                                Falkland Islands (Malvinas)
                                            </option>
                                            <option value='FO'>
                                                Faroe Islands
                                            </option>
                                            <option value='FJ'>Fiji</option>
                                            <option value='FI'>Finland</option>
                                            <option value='FR'>France</option>
                                            <option value='GF'>
                                                French Guiana
                                            </option>
                                            <option value='PF'>
                                                French Polynesia
                                            </option>
                                            <option value='TF'>
                                                French Southern Territories
                                            </option>
                                            <option value='GA'>Gabon</option>
                                            <option value='GM'>Gambia</option>
                                            <option value='GE'>Georgia</option>
                                            <option value='DE'>Germany</option>
                                            <option value='GH'>Ghana</option>
                                            <option value='GI'>
                                                Gibraltar
                                            </option>
                                            <option value='GR'>Greece</option>
                                            <option value='GL'>
                                                Greenland
                                            </option>
                                            <option value='GD'>Grenada</option>
                                            <option value='GP'>
                                                Guadeloupe
                                            </option>
                                            <option value='GU'>Guam</option>
                                            <option value='GT'>
                                                Guatemala
                                            </option>
                                            <option value='GG'>Guernsey</option>
                                            <option value='GN'>Guinea</option>
                                            <option value='GW'>
                                                Guinea-Bissau
                                            </option>
                                            <option value='GY'>Guyana</option>
                                            <option value='HT'>Haiti</option>
                                            <option value='HM'>
                                                Heard Island and Mcdonald
                                                Islands
                                            </option>
                                            <option value='VA'>
                                                Holy See (Vatican City State)
                                            </option>
                                            <option value='HN'>Honduras</option>
                                            <option value='HK'>
                                                Hong Kong
                                            </option>
                                            <option value='HU'>Hungary</option>
                                            <option value='IS'>Iceland</option>
                                            <option value='IN'>India</option>
                                            <option value='ID'>
                                                Indonesia
                                            </option>
                                            <option value='IR'>
                                                Iran, Islamic Republic of
                                            </option>
                                            <option value='IQ'>Iraq</option>
                                            <option value='IE'>Ireland</option>
                                            <option value='IM'>
                                                Isle of Man
                                            </option>
                                            <option value='IL'>Israel</option>
                                            <option value='IT'>Italy</option>
                                            <option value='JM'>Jamaica</option>
                                            <option value='JP'>Japan</option>
                                            <option value='JE'>Jersey</option>
                                            <option value='JO'>Jordan</option>
                                            <option value='KZ'>
                                                Kazakhstan
                                            </option>
                                            <option value='KE'>Kenya</option>
                                            <option value='KI'>Kiribati</option>
                                            <option value='KP'>
                                                Korea, Democratic People's
                                                Republic of
                                            </option>
                                            <option value='KR'>
                                                Korea, Republic of
                                            </option>
                                            <option value='XK'>Kosovo</option>
                                            <option value='KW'>Kuwait</option>
                                            <option value='KG'>
                                                Kyrgyzstan
                                            </option>
                                            <option value='LA'>
                                                Lao People's Democratic Republic
                                            </option>
                                            <option value='LV'>Latvia</option>
                                            <option value='LB'>Lebanon</option>
                                            <option value='LS'>Lesotho</option>
                                            <option value='LR'>Liberia</option>
                                            <option value='LY'>
                                                Libyan Arab Jamahiriya
                                            </option>
                                            <option value='LI'>
                                                Liechtenstein
                                            </option>
                                            <option value='LT'>
                                                Lithuania
                                            </option>
                                            <option value='LU'>
                                                Luxembourg
                                            </option>
                                            <option value='MO'>Macao</option>
                                            <option value='MK'>
                                                Macedonia, the Former Yugoslav
                                                Republic of
                                            </option>
                                            <option value='MG'>
                                                Madagascar
                                            </option>
                                            <option value='MW'>Malawi</option>
                                            <option value='MY'>Malaysia</option>
                                            <option value='MV'>Maldives</option>
                                            <option value='ML'>Mali</option>
                                            <option value='MT'>Malta</option>
                                            <option value='MH'>
                                                Marshall Islands
                                            </option>
                                            <option value='MQ'>
                                                Martinique
                                            </option>
                                            <option value='MR'>
                                                Mauritania
                                            </option>
                                            <option value='MU'>
                                                Mauritius
                                            </option>
                                            <option value='YT'>Mayotte</option>
                                            <option value='MX'>Mexico</option>
                                            <option value='FM'>
                                                Micronesia, Federated States of
                                            </option>
                                            <option value='MD'>
                                                Moldova, Republic of
                                            </option>
                                            <option value='MC'>Monaco</option>
                                            <option value='MN'>Mongolia</option>
                                            <option value='ME'>
                                                Montenegro
                                            </option>
                                            <option value='MS'>
                                                Montserrat
                                            </option>
                                            <option value='MA'>Morocco</option>
                                            <option value='MZ'>
                                                Mozambique
                                            </option>
                                            <option value='MM'>Myanmar</option>
                                            <option value='NA'>Namibia</option>
                                            <option value='NR'>Nauru</option>
                                            <option value='NP'>Nepal</option>
                                            <option value='NL'>
                                                Netherlands
                                            </option>
                                            <option value='AN'>
                                                Netherlands Antilles
                                            </option>
                                            <option value='NC'>
                                                New Caledonia
                                            </option>
                                            <option value='NZ'>
                                                New Zealand
                                            </option>
                                            <option value='NI'>
                                                Nicaragua
                                            </option>
                                            <option value='NE'>Niger</option>
                                            <option value='NG'>Nigeria</option>
                                            <option value='NU'>Niue</option>
                                            <option value='NF'>
                                                Norfolk Island
                                            </option>
                                            <option value='MP'>
                                                Northern Mariana Islands
                                            </option>
                                            <option value='NO'>Norway</option>
                                            <option value='OM'>Oman</option>
                                            <option value='PK'>Pakistan</option>
                                            <option value='PW'>Palau</option>
                                            <option value='PS'>
                                                Palestinian Territory, Occupied
                                            </option>
                                            <option value='PA'>Panama</option>
                                            <option value='PG'>
                                                Papua New Guinea
                                            </option>
                                            <option value='PY'>Paraguay</option>
                                            <option value='PE'>Peru</option>
                                            <option value='PH'>
                                                Philippines
                                            </option>
                                            <option value='PN'>Pitcairn</option>
                                            <option value='PL'>Poland</option>
                                            <option value='PT'>Portugal</option>
                                            <option value='PR'>
                                                Puerto Rico
                                            </option>
                                            <option value='QA'>Qatar</option>
                                            <option value='RE'>Reunion</option>
                                            <option value='RO'>Romania</option>
                                            <option value='RU'>
                                                Russian Federation
                                            </option>
                                            <option value='RW'>Rwanda</option>
                                            <option value='BL'>
                                                Saint Barthelemy
                                            </option>
                                            <option value='SH'>
                                                Saint Helena
                                            </option>
                                            <option value='KN'>
                                                Saint Kitts and Nevis
                                            </option>
                                            <option value='LC'>
                                                Saint Lucia
                                            </option>
                                            <option value='MF'>
                                                Saint Martin
                                            </option>
                                            <option value='PM'>
                                                Saint Pierre and Miquelon
                                            </option>
                                            <option value='VC'>
                                                Saint Vincent and the Grenadines
                                            </option>
                                            <option value='WS'>Samoa</option>
                                            <option value='SM'>
                                                San Marino
                                            </option>
                                            <option value='ST'>
                                                Sao Tome and Principe
                                            </option>
                                            <option value='SA'>
                                                Saudi Arabia
                                            </option>
                                            <option value='SN'>Senegal</option>
                                            <option value='RS'>Serbia</option>
                                            <option value='CS'>
                                                Serbia and Montenegro
                                            </option>
                                            <option value='SC'>
                                                Seychelles
                                            </option>
                                            <option value='SL'>
                                                Sierra Leone
                                            </option>
                                            <option value='SG'>
                                                Singapore
                                            </option>
                                            <option value='SX'>
                                                Sint Maarten
                                            </option>
                                            <option value='SK'>Slovakia</option>
                                            <option value='SI'>Slovenia</option>
                                            <option value='SB'>
                                                Solomon Islands
                                            </option>
                                            <option value='SO'>Somalia</option>
                                            <option value='ZA'>
                                                South Africa
                                            </option>
                                            <option value='GS'>
                                                South Georgia and the South
                                                Sandwich Islands
                                            </option>
                                            <option value='SS'>
                                                South Sudan
                                            </option>
                                            <option value='ES'>Spain</option>
                                            <option value='LK'>
                                                Sri Lanka
                                            </option>
                                            <option value='SD'>Sudan</option>
                                            <option value='SR'>Suriname</option>
                                            <option value='SJ'>
                                                Svalbard and Jan Mayen
                                            </option>
                                            <option value='SZ'>
                                                Swaziland
                                            </option>
                                            <option value='SE'>Sweden</option>
                                            <option value='CH'>
                                                Switzerland
                                            </option>
                                            <option value='SY'>
                                                Syrian Arab Republic
                                            </option>
                                            <option value='TW'>
                                                Taiwan, Province of China
                                            </option>
                                            <option value='TJ'>
                                                Tajikistan
                                            </option>
                                            <option value='TZ'>
                                                Tanzania, United Republic of
                                            </option>
                                            <option value='TH'>Thailand</option>
                                            <option value='TL'>
                                                Timor-Leste
                                            </option>
                                            <option value='TG'>Togo</option>
                                            <option value='TK'>Tokelau</option>
                                            <option value='TO'>Tonga</option>
                                            <option value='TT'>
                                                Trinidad and Tobago
                                            </option>
                                            <option value='TN'>Tunisia</option>
                                            <option value='TR'>Turkey</option>
                                            <option value='TM'>
                                                Turkmenistan
                                            </option>
                                            <option value='TC'>
                                                Turks and Caicos Islands
                                            </option>
                                            <option value='TV'>Tuvalu</option>
                                            <option value='UG'>Uganda</option>
                                            <option value='UA'>Ukraine</option>
                                            <option value='AE'>
                                                United Arab Emirates
                                            </option>
                                            <option value='GB'>
                                                United Kingdom
                                            </option>
                                            <option value='US'>
                                                United States
                                            </option>
                                            <option value='UM'>
                                                United States Minor Outlying
                                                Islands
                                            </option>
                                            <option value='UY'>Uruguay</option>
                                            <option value='UZ'>
                                                Uzbekistan
                                            </option>
                                            <option value='VU'>Vanuatu</option>
                                            <option value='VE'>
                                                Venezuela
                                            </option>
                                            <option value='VN'>Viet Nam</option>
                                            <option value='VG'>
                                                Virgin Islands, British
                                            </option>
                                            <option value='VI'>
                                                Virgin Islands, U.s.
                                            </option>
                                            <option value='WF'>
                                                Wallis and Futuna
                                            </option>
                                            <option value='EH'>
                                                Western Sahara
                                            </option>
                                            <option value='YE'>Yemen</option>
                                            <option value='ZM'>Zambia</option>
                                            <option value='ZW'>Zimbabwe</option>
                                        </select>
                                    </FormGroup>
                                </div>
                            </div>
                        </div>

                        <FormSummary />
                    </div>
                </form>
            </div>
        </Container>
    );
};

Checkout.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

// export const getServerSideProps = withPageAuthRequired();

export default Checkout;

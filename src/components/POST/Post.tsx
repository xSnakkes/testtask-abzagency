import React, { useState, useContext } from "react";
import axios from "axios";
import styles from './post.scss';
import success from '../../assets/successimage.svg';
import MyContext from '../../MyContext';

interface FormData {
    name: string;
    email: string;
    phone: string;
    positionId: number;
    photo: File;
}

interface ResponseData {
    success: boolean;
    message?: string;
}

const BASE_URL = "https://frontend-test-assignment-api.abz.agency/api/v1";

const Post = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        positionId: 0,
        photo: new File([], ""),
    });

    const [positions, setPositions] = useState<any[]>([]);
    const [token, setToken] = useState<string>("");
    const { data, setData } = useContext(MyContext);
    const [errorMessage, setErrorMessage] = useState<string>("");



    React.useEffect(() => {
        // get positions
        axios
            .get(`${BASE_URL}/positions`)
            .then((response) => {
                setPositions(response.data.positions);
            })
            .catch((error) => {
                console.log(error);
            });

        // get token
        axios
            .get(`${BASE_URL}/token`)
            .then((response) => {
                setToken(response.data.token);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        event.target.parentElement?.classList.add
        let errorMessage = '';
        switch (name) {
            case 'name':
                if (!value) {
                    errorMessage = 'Name is required.';
                } else if (value.length < 2 || value.length > 60) {
                    errorMessage = 'Name should be 2-60 characters.';
                    setErrorMessage(errorMessage);
                    let errorHTML = document.createElement('div')
                    errorHTML.innerHTML = `${errorMessage}`
                    document.querySelector('#nameValidate')?.classList.add(`${styles.error}`)
                    if(!document.querySelector('#nameValidate')?.querySelectorAll('div').length){
                        document.querySelector('#nameValidate')?.append(errorHTML)
                    } 
                    
                } else {
                    document.querySelector('#nameValidate')?.classList.remove(`${styles.error}`)
                    let deletEl = document.querySelector('#nameValidate')?.querySelectorAll('div')
                    deletEl?.forEach(element => {
                        element.remove()
                    });
                }
                break;
            case 'email':
                if (!value) {
                    errorMessage = 'Email is required.';
                } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)) {
                    errorMessage = 'Email is not valid.';
                    setErrorMessage(errorMessage);
                    let errorHTML = document.createElement('div')
                    errorHTML.innerHTML = `${errorMessage}`
                    document.querySelector('#emailValidate')?.classList.add(`${styles.error}`)
                    if(!document.querySelector('#emailValidate')?.querySelectorAll('div').length){
                        document.querySelector('#emailValidate')?.append(errorHTML)
                    } 
                } else {
                    document.querySelector('#emailValidate')?.classList.remove(`${styles.error}`)
                    let deletEl = document.querySelector('#emailValidate')?.querySelectorAll('div')
                    deletEl?.forEach(element => {
                        element.remove()
                    });
                }
                break;
            case 'phone':
                if (!value) {
                    errorMessage = 'Phone is required.';
                } else if (!/^(\+38)?0[0-9]{9}$/g.test(value)) {
                    errorMessage = 'Phone is not valid.';
                    setErrorMessage(errorMessage);
                    let errorHTML = document.createElement('div')
                    errorHTML.innerHTML = `${errorMessage}`
                    document.querySelector('#phoneValidate')?.classList.add(`${styles.error}`)
                    if(!document.querySelector('#phoneValidate')?.querySelectorAll('div').length){
                        document.querySelector('#phoneValidate')?.append(errorHTML)
                    } 
                } else {
                    document.querySelector('#phoneValidate')?.classList.remove(`${styles.error}`)
                    let deletEl = document.querySelector('#phoneValidate')?.querySelectorAll('div')
                    deletEl?.forEach(element => {
                        element.remove()
                    });
                }
                break;
            case 'photo':
                
            default:
                break;
        }
        
    };

    const handlePositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const positionId = parseInt(event.target.value);
        setFormData((prevFormData) => ({ ...prevFormData, positionId }));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const files = event.target.files;
        document.querySelector('#fileValidate')?.classList.add(`${styles.added}`)
        let errorMessage = ''
        if (files && files[0]) {
            setFormData((prevFormData) => ({ ...prevFormData, photo: files[0] }));
            const inputfield = document.querySelector('.input__file-name');
            inputfield ? inputfield.innerHTML = files[0].name : null;
            console.log(files[0].size)
            if (files[0].size > 5242880) {
                errorMessage = "Photo should be less than 5 MB.";
                setErrorMessage(errorMessage);
                let errorHTML = document.createElement('p')
                errorHTML.innerHTML = `${errorMessage}`
                console.log(errorHTML)
                document.querySelector('#fileValidate')?.classList.add(`${styles.error}`)
                document.querySelector('#fileValidate')?.append(errorHTML)
                
            } else {
                document.querySelector('#fileValidate')?.classList.remove(`${styles.error}`)
                let deletEl = document.querySelector('#fileValidate')?.querySelector('p')?.remove()
            }
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // validate form data
        
        const { name, email, phone, positionId, photo } = formData;
        if (!name || !email || !phone || !positionId || !photo) {
            setErrorMessage("All fields are required.");
            return;
        }

        if (photo.size > 5242880) {
            setErrorMessage("Photo should be less than 5 MB.");
            return;
        }
        setErrorMessage("");

        // create form data object
        const formDataObject = new FormData();
        formDataObject.append("name", name);
        formDataObject.append("email", email);
        formDataObject.append("phone", phone);
        formDataObject.append("position_id", String(positionId));
        formDataObject.append("photo", photo);

        // post form data
        axios
            .post(`${BASE_URL}/users`, formDataObject, {
                headers: {
                    Token: token,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                const responseData: ResponseData = response.data;
                console.log('1')
                document.querySelector('.form__container')?.classList.add(`${styles.send}`)
                setData('success')
                if (responseData.success) {
                    
                } else {
                    setErrorMessage(responseData.message || "Something went wrong.");
                }
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage("Something went wrong.");
            });
    };

    return (
        <div className={`${styles.form__container} form__container container`}>
            <h1 className={`${styles.post__title} ${styles.none}`}>Working with POST request</h1>
            <form className={`${styles.form} form`} onSubmit={handleSubmit}>
                <label id='nameValidate' htmlFor="name" className={styles.form__label}>
                    <input type="text" id="name" name="name" placeholder=' ' value={formData.name} onChange={handleInputChange} />
                    <span className={styles.span__error} >Your name</span>
                </label>
                <label id='emailValidate' htmlFor="email" className={styles.form__label}>
                    <input type="email" id="email" name="email" placeholder=' ' value={formData.email} onChange={handleInputChange} />
                    <span className={styles.span__error}>Email</span>
                </label>
                <label id='phoneValidate' htmlFor="phone" className={styles.form__label}>
                    <input type="tel" id="phone" name="phone" placeholder=' ' value={formData.phone} onChange={handleInputChange} />
                    <span className={styles.span__error} >Phone</span>
                </label>
                <div className={styles.form__radio}>
                    <span>Select your position</span>
                    {positions.map((position) => (
                        <div className={styles.radio__container}>
                            <input
                                type="radio"
                                name="position_id"
                                value={position.id}
                                checked={formData.positionId === position.id}
                                onChange={handlePositionChange}
                                required
                            />
                            <span className="checkmark"></span>
                            {position.name}
                        </div>
                    ))}
                </div>
                <label id="fileValidate" htmlFor="photo" className={styles.input_file}>
                    <input type="file" id="photo" name="photo" accept="image/jpeg" onChange={handleFileChange} />
                    <span>Upload</span>
                    <div className="input__file-name">Upload your photo</div>
                </label>
                <button type="submit" className={`${styles.submit} button`}>Sign up</button>
            </form>
            <div className={styles.successfully}>
                <h1 className={styles.post__title}>User successfully registered</h1>
                <div className={styles.successfully__img}>
                    <img src={success} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Post
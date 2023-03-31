import React, { useState } from "react";
import axios from "axios";
import styles from './post.scss'

interface FormData {
    name: string;
    email: string;
    phone: string;
    position_id: string;
    photo: File | null;
}

const positions = [
    { id: "1", name: "Frontend Developer" },
    { id: "2", name: "Backend Developer" },
    { id: "3", name: "Security Engineer" },
    { id: "4", name: "Designer" },
];

const Post: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        position_id: "",
        photo: null,
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePositionChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({ ...formData, position_id: event.target.value });
    };

    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let inputfile = document.querySelector('.input__file-name')
        if (event.target.files && event.target.files[0]) {
            setFormData({ ...formData, photo: event.target.files[0] });
            
        }
        

    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("phone", formData.phone);
        data.append("position_id", formData.position_id);
        if (formData.photo) {
            data.append("photo", formData.photo);
        }

        try {
            const response = await axios.post(
                "https://frontend-test-assignment-api.abz.agency/api/v1/users",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(response.data);
            alert("User created successfully!");
            setFormData({
                name: "",
                email: "",
                phone: "",
                position_id: "",
                photo: null,
            });
        } catch (error) {
            console.log(error);
            alert("Error creating user. Please try again.");
        }
    };

    return (
        <div className={`${styles.form__container} container`}>
            <h1 className={styles.post__title}>Working with POST request</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label htmlFor="name" className={styles.form__label}>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={styles.post__title}
                        placeholder=' '
                        required
                    />
                    <span>Your name</span>
                </label>
                <label htmlFor="email" className={styles.form__label}>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder=' '
                        required
                    />
                    <span>Email</span>
                </label>

                <label htmlFor="phone" className={styles.form__label}>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder=' '
                        required
                    />
                    <span>Phone</span>
                </label>

                <div className={styles.form__radio}>
                    <span>Select your position</span>
                    {positions.map((position) => (
                        <div className={styles.radio__container}>
                            <input
                                type="radio"
                                name="position_id"
                                value={position.id}
                                checked={formData.position_id === position.id}
                                // onChange={handlePositionChange}
                                required
                            />
                            <span className="checkmark"></span>
                            {position.name}
                        </div>
                    ))}
                </div>
                <label htmlFor="photo" className={styles.input_file}>
                        <input
                            type="file"
                            id="photo"
                            name="photo"
                            accept="image/*"
                            onChange={handlePhotoChange}
                        />
                      <span>Upload</span>
                      <div className="input__file-name">Upload your photo</div>
                </label>
            </form>
        </div>


    );
};

export default Post;
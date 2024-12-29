import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const Form = () => {
    const schema = yup.object().shape({
        fullName: yup.string().required("Your Full Name is Required"),
        email: yup
            .string()
            .email("Enter a valid email")
            .required("Your Email is Required!"),
        age: yup
            .number()
            .positive()
            .integer()
            .min(18, "Your Age Must Be 18 and above!")
            .required(),
        password: yup
            .string()
            .min(4, "Password must be at least 4 characters")
            .max(12, "Password cannot exceed 12 characters")
            .required("Password is required"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "Passwords don't match")
            .required("Confirm your password"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input
                        type="text"
                        placeholder="Full Name..."
                        {...register("fullName")}
                    />
                    <p>{errors.fullName?.message}</p>
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Email..."
                        {...register("email")}
                    />
                    <p>{errors.email?.message}</p>
                </div>

                <div>
                    <input
                        type="number"
                        placeholder="Age..."
                        {...register("age")}
                    />
                    <p>{errors.age?.message}</p>
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Password..."
                        {...register("password")}
                    />
                    <p>{errors.password?.message}</p>
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Confirm Password..."
                        {...register("confirmPassword")}
                    />
                    <p>{errors.confirmPassword?.message}</p>
                </div>

                <input type="submit" />
            </form>
        </div>
    );
};

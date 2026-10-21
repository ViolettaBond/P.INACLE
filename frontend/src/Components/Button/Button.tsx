import styles from './Button.module.scss';

interface Props {
    text: string;
    variant?: 'primary' | 'ghost';
    onClick?: () => void;
}

export default function Button({ text, variant = 'primary', onClick }: Props) {
    return (
        <button className={`${styles.btn} ${styles[variant]}`} onClick={onClick}>
            {text}
        </button>
    );
}
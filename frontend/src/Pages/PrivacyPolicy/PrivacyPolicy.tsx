import React from 'react';
import styles from './PrivacyPolicy.module.scss';

export const PrivacyPolicy: React.FC = () => {
    return (
        <main className={styles.privacyPage}>
            <header className={styles.header}>
                <h1 className={styles.mainTitle}>Privacy Policy</h1>
                <span className={styles.date}>Last updated: June 23, 2024</span>
            </header>

            <div className={styles.container}>
                <section className={styles.content}>
                    <div className={styles.block}>
                        <p>
                            This Privacy Policy describes our policies and procedures on the
                            collection, use and disclosure of Your information when You use the
                            Service and tells You about Your privacy rights and how the law protects
                            You.
                        </p>
                        <p>
                            We use Your Personal data to provide and improve the Service. By using
                            the Service, You agree to the collection and use of information in
                            accordance with this Privacy Policy. This Privacy Policy has been
                            created with the help of the Privacy Policy Generator.
                        </p>
                    </div>

                    <div className={styles.block}>
                        <h2 className={styles.sectionTitle}>
                            Collecting and Using Your Personal Data
                        </h2>
                        <h3 className={styles.subTitle}>Retention of Your Personal Data</h3>
                        <p>
                            The Company will retain Your Personal Data only for as long as is
                            necessary for the purposes set out in this Privacy Policy. We will
                            retain and use Your Personal Data to the extent necessary to comply with
                            our legal obligations (for example, if we are required to retain your
                            data to comply with applicable laws), resolve disputes, and enforce our
                            legal agreements and policies.
                        </p>
                        <p>
                            The Company will also retain Usage Data for internal analysis purposes.
                            Usage Data is generally retained for a shorter period of time, except
                            when this data is used to strengthen the security or to improve the
                            functionality of Our Service, or We are legally obligated to retain this
                            data for longer time periods.
                        </p>
                    </div>

                    <div className={styles.block}>
                        <h3 className={styles.subTitle}>Transfer of Your Personal Data</h3>
                        <p>
                            Your information, including Personal Data, is processed at the Company's
                            operating offices and in any other places where the parties involved in
                            the processing are located. It means that this information may be
                            transferred to — and maintained on — computers located outside of Your
                            state, province, country or other governmental jurisdiction where the
                            data protection laws may differ than those from Your jurisdiction.
                        </p>
                        <p>
                            Your consent to this Privacy Policy followed by Your submission of such
                            information represents Your agreement to that transfer.
                        </p>
                        <p>
                            The Company will take all steps reasonably necessary to ensure that Your
                            data is treated securely and in accordance with this Privacy Policy and
                            no transfer of Your Personal Data will take place to an organization or
                            a country unless there are adequate controls in place including the
                            security of Your data and other personal information.
                        </p>
                    </div>

                    <div className={styles.block}>
                        <h2 className={styles.sectionTitle}>Delete Your Personal Data</h2>
                        <p>
                            You have the right to delete or request that We assist in deleting the
                            Personal Data that We have collected about You.
                        </p>
                        <p>
                            Our Service may give You the ability to delete certain information about
                            You from within the Service.
                        </p>
                        <p>
                            You may update, amend, or delete Your information at any time by signing
                            in to Your Account, if you have one, and visiting the account settings
                            section that allows you to manage Your personal information. You may
                            also contact Us to request access to, correct, or delete any personal
                            information that You have provided to Us.
                        </p>
                        <p>
                            Please note, however, that We may need to retain certain information
                            when we have a legal obligation or lawful basis to do so.
                        </p>
                    </div>

                    <div className={styles.block}>
                        <h2 className={styles.sectionTitle}>Disclosure of Your Personal Data</h2>
                        <h3 className={styles.subTitle}>Business Transactions</h3>
                        <p>
                            If the Company is involved in a merger, acquisition or asset sale, Your
                            Personal Data may be transferred. We will provide notice before Your
                            Personal Data is transferred and becomes subject to a different Privacy
                            Policy.
                        </p>
                    </div>

                    <div className={styles.block}>
                        <h3 className={styles.subTitle}>Law enforcement</h3>
                        <p>
                            Under certain circumstances, the Company may be required to disclose
                            Your Personal Data if required to do so by law or in response to valid
                            requests by public authorities (e.g. a court or a government agency).
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default PrivacyPolicy;

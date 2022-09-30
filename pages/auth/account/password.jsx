import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import Meta from '@/components/Meta';
import FormInput from '@/components/FormInput';
import DialogBox from '@/components/DialogBox';
import FormButton from '@/components/FormButton';
import DeleteAccount from '@/components/DeleteAccount';
import styles from '@/styles/UpdatePassword.module.scss';

const UpdatePassword = () => {
  const [password, setPassword] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [currentpassword, setCurrentPassword] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Meta title='Account - Albumz Music Entertainment' />
      <section className={styles.account}>
        <h1 className={styles.account__heading}>Account settings</h1>
        <div className={styles.account__container}>
          <div className={styles.left}>
            <div className={styles.userContainer}>
              <div className={styles.imageContainer}>
                <Image
                  src='/img/admin.JPG'
                  width={80}
                  height={80}
                  objectFit='cover'
                  alt=''
                />
              </div>
              <h2 className={styles.userName}>Emmanuel adebayo</h2>
            </div>
            <ul className={styles.list}>
              <li className={styles.list__item}>
                <HomeOutlinedIcon className={styles.itemIcon} />
                <Link href='/auth/account' passHref>
                  <a className={styles.itemLink}>Account</a>
                </Link>
              </li>
              <li className={styles.list__item}>
                <KeyOutlinedIcon className={styles.itemIcon} />
                <Link href='/auth/account/password' passHref>
                  <a className={styles.itemLink}>Password</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.right}>
            <h2 className={styles.accountHeader}>Password</h2>
            <div className={styles.formWrapper}>
              <form onSubmit={handleSubmit} className={styles.form}>
                <FormInput
                  type='password'
                  placeholder='Current Password'
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <FormInput
                  type='password'
                  placeholder='Password'
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormInput
                  type='password'
                  placeholder='Confirm Password'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <FormButton text='Update password' />
              </form>
            </div>

            <div className={styles.delete}>
              <h3 className={styles.delete__header}>Close account</h3>
              <div className={styles.delete__container}>
                <p className={styles.delete__message}><strong>Warning:</strong> Closing your account is irreversible.</p>
                <button
                  onClick={() => setShowModal(false)}
                  className={styles.delete__btn}
                  >
                    Close this account...
                  </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {!showModal && (
        <DialogBox>
          <DeleteAccount onClose={setShowModal} />
        </DialogBox>
      )}
    </>
  );
};

export default UpdatePassword;

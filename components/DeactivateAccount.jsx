import styles from '@/styles/DeactivateAccount.module.scss';

const DeactivateAccount = ({ disabled, onOpen }) => {
  return (
    <div className={styles.delete}>
      <h3 className={styles.delete__header}>Close account</h3>
      <div className={styles.delete__container}>
        <p className={styles.delete__message}><strong>Warning:</strong> Closing your account is irreversible.</p>
        <button
          onClick={onOpen}
          className={styles.delete__btn}
          disabled={disabled}
        >
            Close this account...
          </button>
      </div>
    </div>
  );
};

export default DeactivateAccount;

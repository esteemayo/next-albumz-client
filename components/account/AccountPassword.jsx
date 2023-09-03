import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PropTypes from 'prop-types';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';

import FormInput from '@/components/form/FormInput';
import FormButton from '@/components/form/FormButton';

import DeactivateAccount from './DeactivateAccount';

import styles from '@/styles/UpdatePassword.module.scss';

const AccountPassword = ({
  values,
  currentUser,
  isPassword,
  isConfirm,
  isCurrent,
  disabled,
  loading,
  onOpen,
  onTogglePassword,
  onToggleConfirmPassword,
  onToggleCurrentPassword,
  onChange,
  onSubmit,
}) => {
  const { password, confirmPassword, currentPassword } = values;

  return (
    <div className={styles.right}>
      {!currentUser?.fromGoogle && (
        <>
          <h2 className={styles.accountHeader}>Password</h2>
          <div className={styles.formWrapper}>
            <form onSubmit={onSubmit} className={styles.form}>
              <FormInput
                name='currentPassword'
                value={currentPassword}
                type={isCurrent ? 'text' : 'password'}
                placeholder='Current Password'
                onChange={onChange}
              >
                {isCurrent ? (
                  <VisibilityOff
                    onClick={onToggleCurrentPassword}
                    className={`${styles.form__icon} ${styles.form__iconPassword}`}
                  />
                ) : (
                  <Visibility
                    onClick={onToggleCurrentPassword}
                    className={`${styles.form__icon} ${styles.form__iconPassword}`}
                  />
                )}
              </FormInput>
              <FormInput
                name='password'
                value={password}
                type={isPassword ? 'text' : 'password'}
                placeholder='Password'
                onChange={onChange}
              >
                {isPassword ? (
                  <VisibilityOff
                    onClick={onTogglePassword}
                    className={`${styles.form__icon} ${styles.form__iconPassword}`}
                  />
                ) : (
                   <Visibility
                      onClick={onTogglePassword}
                      className={`${styles.form__icon} ${styles.form__iconPassword}`}
                    />
                )}
              </FormInput>
              <FormInput
                name='confirmPassword'
                value={confirmPassword}
                type={isConfirm ? 'text' : 'password'}
                placeholder='Confirm Password'
                onChange={onChange}
              >
                {isConfirm ? (
                  <VisibilityOff
                    onClick={onToggleConfirmPassword}
                    className={`${styles.form__icon} ${styles.form__iconPassword}`}
                  />
                ) : (
                  <Visibility
                    onClick={onToggleConfirmPassword}
                    className={`${styles.form__icon} ${styles.form__iconPassword}`}
                  />
                )}
              </FormInput>
              <FormButton
                text='Update password'
                disabled={disabled}
              />
            </form>
          </div>
        </>
      )}
      <DeactivateAccount
        onOpen={onOpen}
        disabled={disabled}
      />
    </div>
  );
};

AccountPassword.propTypes = {
  values: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  isPassword: PropTypes.bool.isRequired,
  isConfirm: PropTypes.bool.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onTogglePassword: PropTypes.func.isRequired,
  onToggleConfirmPassword: PropTypes.func.isRequired,
  onToggleCurrentPassword: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AccountPassword;

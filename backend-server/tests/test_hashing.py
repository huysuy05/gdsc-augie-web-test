from hashing import Hash
import pytest

def test_bcrypt_hash_and_verify():
    password = "testingpassword"
    hashed_pw = Hash.bcrypt(password)

    # Assure hashed password is not the same as orginal password
    assert hashed_pw != password

    # Hashed password should be verified with original password
    assert Hash.verify(hashed_pw, password)
    assert not Hash.verify(hashed_pw, "wrongpassword")

def test_bcrypt_hash_is_unique():
    password = "Testing password"
    hash1 = Hash.bcrypt(password)
    hash2 = Hash.bcrypt(password)

    assert hash1 != hash2
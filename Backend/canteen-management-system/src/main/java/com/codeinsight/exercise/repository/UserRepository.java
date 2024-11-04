package com.codeinsight.exercise.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.codeinsight.exercise.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{
	Optional<User> findUserByEmail(String userName);
}

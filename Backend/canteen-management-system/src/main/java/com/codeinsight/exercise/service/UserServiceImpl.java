package com.codeinsight.exercise.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.codeinsight.exercise.DTO.GenericResponseDTO;
import com.codeinsight.exercise.DTO.UserDTO;
import com.codeinsight.exercise.entity.User;
import com.codeinsight.exercise.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private JwtService jwtService;

	public User getCurrentUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		if (authentication != null && authentication.isAuthenticated()) {
			User principal = (User) authentication.getPrincipal();
			return principal;
		}

		return null;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findUserByEmail(username)
				.orElseThrow(() -> new UsernameNotFoundException("User not present"));
		return user;
	}

	@Override
	public GenericResponseDTO<UserDTO> registerUser(UserDTO userDTO, PasswordEncoder passwordEncoder) {
		GenericResponseDTO<UserDTO> responseDTO = new GenericResponseDTO<UserDTO>();

		try {
			User user = new User();
			user.setEmail(userDTO.getEmail());
			user.setName(userDTO.getName());
			user.setPhoneNumber(userDTO.getPhoneNumber());
			user.setRole(userDTO.getRole());
			String encodedPassword = passwordEncoder.encode(userDTO.getPassword());
			user.setPassword(encodedPassword);

			User userResult = this.saveUser(user);

			if (userResult.getId() > 0) {
				responseDTO.setStatusCode(HttpStatus.OK.value());
				responseDTO.setMessage("User Registered Successfully");
			}
		} catch (Exception exception) {
			responseDTO.setError("Error registering user: " + exception.getMessage());
			responseDTO.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
		}
		return responseDTO;
	}

	private User saveUser(UserDetails user) {
		return userRepository.save((User) user);
	}

	@Override
	public GenericResponseDTO<UserDTO> login(UserDTO userLoginDTO, AuthenticationManager authenticationManager) {
		GenericResponseDTO<UserDTO> responseDTO = new GenericResponseDTO<UserDTO>();
		UserDTO userDTO = new UserDTO();

		try {
			authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(userLoginDTO.getEmail(), userLoginDTO.getPassword()));
			User user = userRepository.findUserByEmail(userLoginDTO.getEmail()).orElseThrow();
			String token = jwtService.generateToken(user);
			String refreshToken = jwtService.generateRefreshToken(new HashMap<String, Object>(), user);

			userDTO.setToken(token);
			userDTO.setRefreshToken(refreshToken);
			userDTO.setRole(user.getRole());
			userDTO.setExpirationTime("24Hrs");

			
			responseDTO.setData(userDTO);
			
			responseDTO.setMessage("Successfully Logged In");
			responseDTO.setStatusCode(HttpStatus.OK.value());
		} catch (Exception exception) {
			responseDTO.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
			responseDTO.setError("Error logging in: " + exception.getMessage());
		}
		return responseDTO;
	}

	@Override
	public GenericResponseDTO<List<UserDTO>> getUsers() {
		GenericResponseDTO<List<UserDTO>> responseDTO = new GenericResponseDTO<List<UserDTO>>();
		List<UserDTO> usersDTO = new ArrayList<UserDTO>();
		try {
			List<User> users = userRepository.findAll();

			users.forEach(user -> {
				UserDTO userDTO = new UserDTO(user.getRole(), user.getId(), user.getEmail(), user.getName(),
						user.getPhoneNumber());
				usersDTO.add(userDTO);
			});
			
			responseDTO.setData(usersDTO);
			
			responseDTO.setMessage("Users fetched successfully");
			responseDTO.setStatusCode(HttpStatus.OK.value());
		} catch (Exception exception) {
			responseDTO.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
			responseDTO.setError("Error fetching users: " + exception.getMessage());
		}
		return responseDTO;
	}

	@Override
	public GenericResponseDTO<UserDTO> updateUser(Long userId, UserDTO userDTO, PasswordEncoder passwordEncoder) {
		GenericResponseDTO<UserDTO> responseDTO = new GenericResponseDTO<UserDTO>();

		try {
			User user = userRepository.getReferenceById(userId);
			user.setName(userDTO.getName());
			user.setPhoneNumber(userDTO.getPhoneNumber());
			user.setEmail(userDTO.getEmail());
			user.setRole(userDTO.getRole());
			user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
			this.saveUser(user);

			responseDTO.setMessage("User updated successfully");
			responseDTO.setStatusCode(HttpStatus.OK.value());
		} catch (Exception exception) {
			responseDTO.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
			responseDTO.setError("Error updating user: " + exception.getMessage());
		}

		return responseDTO;
	}

	@Override
	public GenericResponseDTO<UserDTO> deleteUser(Long userId) {
		GenericResponseDTO<UserDTO> responseDTO = new GenericResponseDTO<UserDTO>();

		try {
			User user = userRepository.getReferenceById(userId);
			userRepository.delete(user);
			responseDTO.setMessage("User deleted successfully");
			responseDTO.setStatusCode(HttpStatus.OK.value());
		} catch (Exception exception) {
			responseDTO.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
			responseDTO.setError("Error deleting user: " + exception.getMessage());
		}

		return responseDTO;
	}

	@Override
	public GenericResponseDTO<UserDTO> getUserById(Long userId) {
		GenericResponseDTO<UserDTO> responseDTO = new GenericResponseDTO<UserDTO>();
		UserDTO userDTO = new UserDTO();

		try {
			User user = userRepository.getReferenceById(userId);
			userDTO.setUserId(userId);
			userDTO.setName(user.getName());
			userDTO.setEmail(user.getEmail());
			userDTO.setRole(user.getRole());
			userDTO.setPhoneNumber(user.getPhoneNumber());
			
			responseDTO.setData(userDTO);

			responseDTO.setStatusCode(HttpStatus.OK.value());
			responseDTO.setMessage("User Fetched");
		} catch (Exception exception) {
			responseDTO.setError("Error fetching user: " + exception.getMessage());
			responseDTO.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
		}

		return responseDTO;
	}
}

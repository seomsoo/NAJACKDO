package com.najackdo.server.core.support;

import static org.mockito.Mockito.*;

import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

import org.mockito.Mock;

import com.najackdo.server.domain.user.entity.ProviderType;
import com.najackdo.server.domain.user.entity.RoleType;
import com.najackdo.server.domain.user.entity.User;
import com.najackdo.server.domain.user.repository.UserRepository;

public abstract class UserSupport {
	private final AtomicLong atomicLong = new AtomicLong(1);

	@Mock
	protected UserRepository userRepository;

	// 기본 사용자 생성
	protected User createUser() {
		return createUser("test-user");
	}

	// 사용자 이름을 지정하여 사용자 생성
	protected User createUser(String username) {
		User user = spy(User.createUser(username, username, 'M', ProviderType.KAKAO, "123456", "default.png"));

		long id = atomicLong.incrementAndGet();
		lenient().when(user.getId()).thenReturn(id);
		lenient().when(user.getUsername()).thenReturn(username);
		lenient().when(user.getName()).thenReturn(username);
		lenient().when(user.getNickName()).thenReturn(username);
		lenient().when(user.getEmail()).thenReturn(username + "@example.com");
		lenient().when(user.getGender()).thenReturn('M');
		lenient().when(user.getAge()).thenReturn("20대");
		lenient().when(user.getRoleType()).thenReturn(RoleType.USER);
		lenient().when(user.getCash()).thenReturn(1000);
		lenient().when(user.getProfileImage()).thenReturn("default.png");

		lenient().when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));

		return user;
	}

}

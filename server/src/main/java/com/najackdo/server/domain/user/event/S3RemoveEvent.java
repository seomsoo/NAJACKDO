package com.najackdo.server.domain.user.event;

import com.najackdo.server.domain.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class S3RemoveEvent {
    User user;
}

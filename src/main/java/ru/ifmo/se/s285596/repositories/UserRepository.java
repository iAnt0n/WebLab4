package ru.ifmo.se.s285596.repositories;

import org.springframework.data.repository.CrudRepository;
import ru.ifmo.se.s285596.models.User;

public interface UserRepository extends CrudRepository<User, Long> {
    User findByUsername(String username);
}

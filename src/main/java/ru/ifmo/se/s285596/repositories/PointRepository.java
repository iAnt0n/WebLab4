package ru.ifmo.se.s285596.repositories;

import org.springframework.data.repository.CrudRepository;
import ru.ifmo.se.s285596.models.Points;
import ru.ifmo.se.s285596.models.User;

import java.util.List;

public interface PointRepository extends CrudRepository<Points, Long> {
    List<Points> getAllByUser(User user);
    void deleteAllByUser(User user);

}

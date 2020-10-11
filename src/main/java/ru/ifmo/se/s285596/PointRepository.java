package ru.ifmo.se.s285596;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PointRepository extends CrudRepository<Points, Integer> {
    Iterable<Points> getAllByUser(User user);
}

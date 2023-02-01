package com.SystemyInformacyjne.TrainApplication.service;

import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;

public class BaseTest {
    @Container
    static final PostgreSQLContainer container;
    static {
        container = new PostgreSQLContainer("postgres:latest");

        container.start();
    }
}

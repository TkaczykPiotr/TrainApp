package com.SystemyInformacyjne.TrainApplication.repository;

import com.SystemyInformacyjne.TrainApplication.models.Connection;
import com.SystemyInformacyjne.TrainApplication.models.Ticket;
import com.SystemyInformacyjne.TrainApplication.models.User;
import com.SystemyInformacyjne.TrainApplication.service.BaseTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import java.util.ArrayList;
import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class ConnectionRepositoryTest extends BaseTest{
    @Autowired
    private ConnectionRepository connectionRepository;


    @Test
    void addTConnectionsTest(){
        List<Connection>connectionsList = new ArrayList<Connection>();
        connectionsList.add(new Connection(1,"T1","Kielce", "Radom", "2022.05.20","12:00", "2022.05.20","16:30",12 ));
        connectionsList.add(new Connection(2,"T2","Kraków", "Warszawa", "2022.05.19","12:00", "2022.05.20","20:30",16 ));
        connectionsList.add(new Connection(3,"T3","Busko Zdrój", "Poznań", "2022.05.20","23:00", "2022.05.21","18:00",10 ));
        connectionRepository.saveAll(connectionsList);

        List<Connection> l = connectionRepository.findAll();
        assertThat(l.size()).isEqualTo(connectionsList.size());
    }
    @Test
    void updateTicketChangesApply(){
        List<Connection>connectionsList = new ArrayList<Connection>();
        connectionsList.add(new Connection(1,"T1","Kielce", "Radom", "2022.05.20","12:00", "2022.05.20","16:30",12 ));
        connectionsList.add(new Connection(2,"T2","Kraków", "Warszawa", "2022.05.19","12:00", "2022.05.20","20:30",16 ));
        connectionsList.add(new Connection(3,"T3","Busko Zdrój", "Poznań", "2022.05.20","23:00", "2022.05.21","18:00",10 ));
        connectionRepository.saveAll(connectionsList);

        List<Connection> l = connectionRepository.findAll();

        l.get(0).setTimeStarting("13:00");
        l.get(0).setTimeFinal("18:00");
        long modifiedTicketId = l.get(0).getId();
        connectionRepository.save(l.get(0));

        l = connectionRepository.findAll();

        assertThat(l.size()).isEqualTo(connectionsList.size());
        Connection temp = connectionRepository.getById(modifiedTicketId);
        assertThat(temp.getTimeStarting()).isEqualTo("13:00");
    }
}
package com.SystemyInformacyjne.TrainApplication.repository;

import com.SystemyInformacyjne.TrainApplication.models.Ticket;
import com.SystemyInformacyjne.TrainApplication.models.User;
import com.SystemyInformacyjne.TrainApplication.service.BaseTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.ArrayList;
import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class TicketRepositoryTest extends BaseTest{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TicketRepository ticketRepository;




    @Test
    void addTicketTest(){
    User user = new User("UsernameTest232211","mailmail232211@mail.com","Password" );
    user.setId(99l);
    userRepository.save(user);

    List<Ticket>ticketList = new ArrayList<Ticket>();
    ticketList.add(new Ticket(1l, 1, 99, 1, 22, "User", "userSurname", "20.05.2022", 12));
    ticketList.add(new Ticket(2l, 2, 99, 2, 22, "User", "userSurname", "21.05.2022", 13));
    ticketList.add(new Ticket(3l, 3, 99, 3, 48, "User", "userSurname", "21.05.2022", 13));
    ticketRepository.saveAll(ticketList);

    List<Ticket> l = ticketRepository.findAll();
    assertThat(l.size()).isEqualTo(ticketList.size());
    }
    @Test
    void updateTicketChangesApply(){
        User user = new User("UsernameTest232211","mailmail232211@mail.com","Password" );
        user.setId(99l);
        userRepository.save(user);

        List<Ticket>ticketList = new ArrayList<Ticket>();
        ticketList.add(new Ticket(1l, 1, 99, 1, 22, "User", "userSurname", "20.05.2022", 12));
        ticketList.add(new Ticket(2l, 2, 99, 2, 22, "User", "userSurname", "21.05.2022", 13));
        ticketList.add(new Ticket(3l, 3, 99, 3, 48, "User", "userSurname", "21.05.2022", 13));
        ticketRepository.saveAll(ticketList);

        List<Ticket> l = ticketRepository.findAll();

        l.get(0).setUserName("new user");
        long modifiedTicketId = l.get(0).getId();
        ticketRepository.save(l.get(0));

        l = ticketRepository.findAll();

        assertThat(l.size()).isEqualTo(ticketList.size());
        Ticket temp = ticketRepository.getById(modifiedTicketId);
        assertThat(temp.getUserName()).isEqualTo("new user");
    }
}
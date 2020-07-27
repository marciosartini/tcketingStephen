import {Listener, OrderCreatedEvent, Subjects} from '@wctickets/common';
import {Message} from 'node-nats-streaming';
import {queueGroupName} from './queue-group-name';
import {expirationQueue} from '../../QUEUES/expiration-queue';

export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message){
        const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
        console.log('waiting', delay)

        await expirationQueue.add({
            orderId: data.id
        },{
            delay: 10000
        });

        msg.ack();
    }
}

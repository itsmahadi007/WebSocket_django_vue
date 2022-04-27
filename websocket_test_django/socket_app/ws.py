import json

from channels.generic.websocket import AsyncWebsocketConsumer
from django.conf import settings


class SystemConsumer(AsyncWebsocketConsumer):
    group_name = settings.STREAM_SOCKET_GROUP_NAME

    async def connect(self):
        # Joining group
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # Leave group
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        # Receive data from WebSocket
        text_data_json = json.loads(text_data)
        first_value = float(text_data_json['first_value'])
        second_value = float(text_data_json['second_value'])
        print(first_value + second_value)
        # Print message that receive from Websocket

        first_value = first_value if first_value is not None else 0
        second_value = second_value if second_value is not None else 0
        # Send data to group
        await self.channel_layer.group_send(
            self.group_name,
            {
                'type': 'system_load',
                'data': {
                    'first_value': first_value,
                    # initial value for cpu and ram set to 0
                    'second_value': second_value,
                    'sum_value': first_value + second_value,
                }
            }
        )

    async def system_load(self, event):
        # Receive data from group
        await self.send(text_data=json.dumps(event['data']))

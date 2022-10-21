from logging.config import valid_ident
from wsgiref import validate
from rest_framework import serializers
from blogs.models import Donation_blogs,Category

class writeDonationSerializer(serializers.ModelSerializer):

    image = serializers.ImageField(required=False)
    name = serializers.CharField(max_length=255)
    write = serializers.CharField(max_length=255)
    reason = serializers.CharField(max_length=255)
    description = serializers.CharField(max_length=255)
    location = serializers.CharField(max_length=255)
    Amount_requested = serializers.IntegerField(default=0)

            
    class Meta:

        model = Donation_blogs
        fields = ('name','write','description','reason','location',
        'Amount_requested','created','category','image')

    def create(self, validated_data) :

        return Donation_blogs.objects.create(**validated_data)

    def update(self, instance, validated_data):

        instance.name           = validated_data.get('name',instance.name)
        instance.write          = validated_data.get('write',instance.write)
        instance.reason         = validated_data.get('reason',instance.reason)
        instance.description    = validated_data.get('description',instance.description)
        instance.location       = validated_data.get('location',instance.location)
        instance.Amount_requested= validated_data.get('Amount_requested',instance.Amount_requested)
        instance.category       = validated_data.get('category',instance.category)
        instance.image           = validated_data.get('image',instance.image)
        instance.save()

        return instance



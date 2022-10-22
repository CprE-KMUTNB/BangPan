from logging.config import valid_ident
from wsgiref import validate
from rest_framework import serializers
from blogs.models import Donation_blogs,Category_User,Category_Object

class writeDonationSerializer(serializers.ModelSerializer):

    
    name = serializers.CharField(max_length=255,required=False)
    write = serializers.CharField(max_length=255,required=False)
    reason = serializers.CharField(max_length=255,required=False)
    description = serializers.CharField(max_length=255,required=False)
    location = serializers.CharField(max_length=255,required=False)
    image = serializers.ImageField(required=False)
    Amount_requested = serializers.IntegerField(required=False)
    category_object = serializers.ChoiceField(choices=Category_Object.choices, default=Category_Object.APPLIANCE)
    category_user = serializers.ChoiceField(choices=Category_User.choices, default=Category_User.KID)
            
    class Meta:

        model = Donation_blogs
        fields = ('name','write','description','reason','location',
        'Amount_requested','created','image','category_object','category_user')

    def create(self, validated_data) :

        return Donation_blogs.objects.create(**validated_data)

    def update(self, instance, validated_data):

        instance.name           = validated_data.get('name',instance.name)
        instance.write          = validated_data.get('write',instance.write)
        instance.reason         = validated_data.get('reason',instance.reason)
        instance.description    = validated_data.get('description',instance.description)
        instance.location       = validated_data.get('location',instance.location)
        instance.Amount_requested= validated_data.get('Amount_requested',instance.Amount_requested)
        instance.image           = validated_data.get('image',instance.image)
        instance.category_object = validated_data.get('category_object',instance.category_object)
        instance.category_user  = validated_data.get('category_user',instance.category_user)

        instance.save()

        return instance


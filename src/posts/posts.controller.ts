import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
// import { PostModel } from './posts.model';
import { IsNotEmpty } from 'class-validator'
import { InjectModel } from 'nestjs-typegoose';
import { Post as PostSchema } from './posts.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
class CreatePostDto{
    @ApiProperty({description:"帖子标题",example:"我是标题"})
    @IsNotEmpty({message:"请填写标题"})
    title:string
    @ApiProperty({description:"帖子内容",example:"我是内容"})
    content:string
}
@Controller('posts')
@ApiTags('帖子模块')
export class PostsController {
    //依赖注入
    constructor(@InjectModel(PostSchema) private readonly PostModel:ModelType<PostSchema>){

    }

    @Get()
    @ApiOperation({summary:'显示博客列表'})
    async index(){
        return await this.PostModel.find()
    }
    @Post()
    @ApiOperation({summary:'创建帖子'})
    async create(@Body() createPostDto:CreatePostDto){
        await this.PostModel.create(createPostDto)
        return {
            success:true
        }
    }
    @ApiOperation({summary:'获取帖子'})
    @Get(':id')
    async detail(@Param('id') id:string){
        return await this.PostModel.findById(id)
    }
    @Put(':id')
    @ApiOperation({summary:"修改帖子"})
    async update(@Param('id') id:string,@Body() updatePostDto:CreatePostDto){
        await this.PostModel.findByIdAndUpdate(id,updatePostDto)
        return {
            success: true
        }
    }
    @Delete(":id")
    @ApiOperation({summary:"删除帖子"})
    async remove(@Param('id') id){
        await this.PostModel.findByIdAndDelete(id)
        return{
            success:true
        }
    }
}

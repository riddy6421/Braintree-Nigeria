package matimatiks.matimatiks;

import android.content.Context;
import android.content.Intent;
import android.content.res.Resources;
import android.graphics.Color;
import android.graphics.Point;
import android.graphics.Rect;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.annotation.RequiresApi;
import android.support.v4.app.Fragment;
import android.support.v7.widget.CardView;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.DisplayMetrics;
import android.view.LayoutInflater;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link Exam_View.OnFragmentInteractionListener} interface
 * to handle interaction events.
 * Use the {@link Exam_View#newInstance} factory method to
 * create an instance of this fragment.
 */
public class Exam_View extends Fragment implements SurfaceHolder.Callback {
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";
    private MediaPlayer mp;
    private List<Exam> exam;
    private SurfaceView mSurfaceView;
    private StorageReference storageRef;
    private FirebaseAuth firebaseAuth;
    private FrameLayout.LayoutParams layoutParams;
    private static float width;
    private static float height;
    public static View v = null;
    public static boolean click = false;
    public static float px_w, px_h=0;
  

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    private OnFragmentInteractionListener mListener;



    public Exam_View() {
        // Required empty public constructor
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        mp = new MediaPlayer();
        mSurfaceView = getActivity().findViewById(R.id.surface);
        mSurfaceView.getHolder().addCallback(this);
        
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment Exam_View.
     */
    // TODO: Rename and change types and number of parameters
    public static Exam_View newInstance(String param1, String param2) {
        Exam_View fragment = new Exam_View();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }
        storageRef = FirebaseStorage.getInstance().getReference();
        firebaseAuth = FirebaseAuth.getInstance();

    }

    @RequiresApi(api = Build.VERSION_CODES.JELLY_BEAN_MR1)
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        v = inflater.inflate(R.layout.fragment_exam__view, container, false);
        getWidth();
        convertDpToPixel();

        mSurfaceView = v.findViewById(R.id.surface);

        layoutParams = new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.WRAP_CONTENT);

        layoutParams.setMargins(0, (int) Profile.height-20, 0, 0);
        System.out.println(Profile.height-20);

        mSurfaceView.setLayoutParams(layoutParams);

        

        RecyclerView rv= v.findViewById(R.id.rv);
        rv.setHasFixedSize(true);



        GridLayoutManager llm = new GridLayoutManager(getActivity(),2);
        rv.setLayoutManager(llm);


        initializeData();

        RVAdapter adapter = new RVAdapter(exam);


        rv.setAdapter(adapter);
        adapter.hide();


        return v;
    }

    // TODO: Rename method, update argument and hook method into UI event
    public void onButtonPressed(Uri uri) {
        if (mListener != null) {
            mListener.onFragmentInteraction(uri);
        }
    }


    @RequiresApi(api = Build.VERSION_CODES.JELLY_BEAN_MR1)
    public void getWidth(){
        Point displaySize = new Point();
        float dp = getResources().getDisplayMetrics().density;
        getActivity().getWindowManager().getDefaultDisplay().getRealSize(displaySize);

        Rect windowSize = new Rect();
        getActivity().getWindow().getDecorView().getWindowVisibleDisplayFrame(windowSize);

        width = displaySize.x - Math.abs(windowSize.width());
        height = displaySize.y - Math.abs(windowSize.height());
        width =  width/dp;
        height = height/dp;
    }

    public void convertDpToPixel(){
        Resources resources = getResources();
        DisplayMetrics metrics = resources.getDisplayMetrics();
         px_w = width * ((float)metrics.densityDpi / DisplayMetrics.DENSITY_DEFAULT);
        px_h = height * ((float)metrics.densityDpi / DisplayMetrics.DENSITY_DEFAULT);
      //  System.out.println("high "+px_h);
    }
    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnFragmentInteractionListener) {
            mListener = (OnFragmentInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnFragmentInteractionListener");
        }
    }


    @Override
    public void onResume() {
        super.onResume();
        mp = new MediaPlayer();
        mSurfaceView = getActivity().findViewById(R.id.surface);
        mSurfaceView.getHolder().addCallback(this);
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    @Override
    public void surfaceCreated(SurfaceHolder surfaceHolder) {

        Uri video = Uri.parse("android.resource://" + getActivity().getPackageName() + "/"
                + R.raw.pencil_down);

        try {
            mp.setDataSource(getActivity().getApplicationContext(),video);
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            mp.prepare();
        } catch (IOException e) {
            e.printStackTrace();
        }

        //Start video
        mp.setDisplay(surfaceHolder);
        mp.setLooping(true);
        mp.start();
    }

    @Override
    public void surfaceChanged(SurfaceHolder surfaceHolder, int i, int i1, int i2) {

    }

    @Override
    public void surfaceDestroyed(SurfaceHolder surfaceHolder) {

    }

    /**
     * This interface must be implemented by activities that contain this
     * fragment to allow an interaction in this fragment to be communicated
     * to the activity and potentially other fragments contained in that
     * activity.
     * <p>
     * See the Android Training lesson <a href=
     * "http://developer.android.com/training/basics/fragments/communicating.html"
     * >Communicating with Other Fragments</a> for more information.
     */
    interface OnFragmentInteractionListener {
        // TODO: Update argument type and name
        void onFragmentInteraction(Uri uri);
    }
    
    private void initializeData(){
        exam = new ArrayList<>();
        exam.add(new Exam("WAEC", R.mipmap.waec));
      //  exam.add(new Exam("UTME", R.mipmap.jamb));
    }
    
}
class Exam {
    String exam;
    int photoId;

    Exam(String exam, int photoId) {
        this.exam = exam;
        this.photoId = photoId;
    }
}
   class RVAdapter extends RecyclerView.Adapter<RVAdapter.PersonViewHolder>{
        private List<Exam> ex;
        Exam_View e = new Exam_View();
        private StorageReference storageRef;
        private FirebaseAuth firebaseAuth;
        private ArrayList<Integer> Qlist;
        private int NOF = 50, Mode = 2;
        private ProgressBar progressBar;

        RVAdapter(List<Exam> ex){
            this.ex = ex;
        }

        @Override
        public PersonViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
            View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.item, parent, false);
            return new PersonViewHolder(v);
        }

        @Override
        public void onBindViewHolder(PersonViewHolder holder, int position) {

            holder.exam.setText(ex.get(position).exam);
            holder.personPhoto.setImageResource(ex.get(position).photoId);

            if (position == 0) {
                holder.cv.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(final View view) {
                        progress();
                        storageRef = FirebaseStorage.getInstance().getReference();
                        firebaseAuth = FirebaseAuth.getInstance();
                        storageRef = FirebaseStorage.getInstance().getReference();
                        firebaseAuth = FirebaseAuth.getInstance();
                        randomNum(NOF);
                        System.out.println("IT IS "+Qlist.get(0));
                        storageRef.child("Waec-Jamb").child("Takemockexammode").child("WAEC").child("Questions").child("Q" + Qlist.get(0) + ".JPG")
                                .getBytes(Long.MAX_VALUE).addOnSuccessListener(new OnSuccessListener<byte[]>() {
                            @Override
                            public void onSuccess(byte[] bytes) {
                                Intent intent = new Intent(view.getContext(), Questions.class);
                                intent.putExtra("DATA", bytes);
                                intent.putExtra("MODE", Mode);
                                intent.putIntegerArrayListExtra("RAND", Qlist);
                                view.getContext().startActivity(intent);
                                hide();
                                // Use the bytes to display the image
                            }
                        }).addOnFailureListener(new OnFailureListener() {
                            @Override
                            public void onFailure(@NonNull Exception exception) {
                                //   Hideprogress();
                                Toast.makeText(view.getContext(), exception.getMessage(), Toast.LENGTH_LONG).show();
                                hide();
                                // Handle any errors
                            }
                        });
                    }
                });

                holder.cv.setCardBackgroundColor(Color.YELLOW);
            }
          //  else{


         //       holder.cv.setCardBackgroundColor(Color.argb(255,56,142,60));
          //  }
        }

        @Override
        public int getItemCount() {
            return ex.size();
        }

       private void randomNum(int Nof) {

           Qlist = new ArrayList<>();
           Test test = new Test(Nof);

           for (int i = 0; i < Nof; i++)
               Qlist.add(test.nextRnd());

       }

       public void progress(){
           progressBar = Exam_View.v.findViewById(R.id.progressBar_cyclic);
           progressBar.setVisibility(View.VISIBLE);
       }

       public void hide(){
           progressBar = Exam_View.v.findViewById(R.id.progressBar_cyclic);
           progressBar.setVisibility(View.INVISIBLE);
       }
        @Override
        public void onAttachedToRecyclerView(RecyclerView recyclerView) {
            super.onAttachedToRecyclerView(recyclerView);
        }

       static class PersonViewHolder extends RecyclerView.ViewHolder  {
            CardView cv;
            TextView exam;
            ImageView personPhoto;

           PersonViewHolder(View itemView) {
               super(itemView);
                cv = itemView.findViewById(R.id.cv);
                exam = itemView.findViewById(R.id.person_name);
                personPhoto = itemView.findViewById(R.id.person_photo);
            }
       }

    }



